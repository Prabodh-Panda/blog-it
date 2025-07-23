import React, { useRef, useState } from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePosts";
import { ActionDropdown, Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import NewPostForm from "./Form";

const {
  Menu,
  MenuItem: { Button: MenuItemButton },
} = ActionDropdown;

const New = () => {
  const [status, setStatus] = useState("published");

  const { t } = useTranslation();

  const formikRef = useRef();

  const { mutate: createPost, isLoading } = useCreatePost();

  const history = useHistory();

  const handleSubmit = async postData => {
    const payload = {
      ...postData,
      status,
      category_ids: postData.categories.map(category => category.value),
    };

    createPost(payload, {
      onSuccess: () => {
        history.push(routes.myPosts.index);
      },
    });
  };

  const handleSubmitButtonClick = () => {
    if (formikRef.current) formikRef.current.submitForm();
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          title={t("titles.newBlogPost")}
          actionBlock={
            <div className="ml-auto mt-auto space-x-2">
              <Button
                disabled={isLoading}
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
          <NewPostForm innerRef={formikRef} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default New;
