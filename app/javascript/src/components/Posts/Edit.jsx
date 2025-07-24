import React, { useRef, useState } from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePosts";
import { ActionDropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import NewPostForm from "./Form";
import { getCategoryOptions } from "./utils";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const Edit = () => {
  const [status, setStatus] = useState("published");

  const formikRef = useRef();

  const history = useHistory();

  const { t } = useTranslation();

  const { slug } = useParams();
  const { data: { post } = {}, isLoading: isShowPostLoading } =
    useShowPost(slug);

  const { mutate: updatePost, isLoading: isUpdatePostLoading } =
    useUpdatePost();

  const initialValues = {
    ...post,
    categories: getCategoryOptions(post?.categories),
  };

  const handleSubmit = async postData => {
    const payload = {
      ...postData,
      status,
      category_ids: postData.categories.map(category => category.value),
    };

    updatePost(
      {
        slug,
        payload,
      },
      {
        onSuccess: () => {
          history.push(routes.posts.index);
        },
      }
    );
  };

  const handleSubmitButtonClick = () => {
    if (formikRef.current) formikRef.current.submitForm();
  };

  if (isShowPostLoading) return <PageLoader />;

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          title={t("titles.editBlogPost")}
          actionBlock={
            <div className="ml-auto mt-auto space-x-2">
              <Button
                disabled={isUpdatePostLoading}
                style="secondary"
                to={routes.posts.index}
              >
                {t("labels.cancel")}
              </Button>
              <ActionDropdown
                label={status === "published" ? "Publish" : "Save as draft"}
                onClick={handleSubmitButtonClick}
              >
                <Menu>
                  <MenuItemButton onClick={() => setStatus("published")}>
                    Publish
                  </MenuItemButton>
                  <MenuItemButton onClick={() => setStatus("draft")}>
                    Save as draft
                  </MenuItemButton>
                </Menu>
              </ActionDropdown>
            </div>
          }
        />
        <div className="w-full flex-1 px-16 pb-10">
          <NewPostForm
            initialValues={initialValues}
            innerRef={formikRef}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
