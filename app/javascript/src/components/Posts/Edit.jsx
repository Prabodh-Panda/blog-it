import React, { useRef, useState } from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePosts";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import routes from "routes";

import ActionBlock from "./ActionBlock";
import EditPostForm from "./Form";
import { getCategoryOptions, getPayloadFromFormData } from "./utils";

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
    const updateData = {
      slug,
      payload: getPayloadFromFormData(postData, status),
    };

    updatePost(updateData, {
      onSuccess: () => {
        history.push(routes.posts.index);
      },
    });
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
            <ActionBlock
              {...{
                slug,
                status,
                setStatus,
                onClick: handleSubmitButtonClick,
                disabled: isUpdatePostLoading,
                shouldShowPreviewButton: true,
                shouldShowDeleteButton: true,
              }}
            />
          }
        />
        <div className="w-full flex-1 px-16 pb-10">
          <EditPostForm
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
