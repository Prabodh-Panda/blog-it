import React, { useRef, useState } from "react";

import { Header, PageLoader, Sidebar } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePosts";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

import ActionBlock from "./ActionBlock";
import NewPostForm from "./Form";
import { getPayloadFromFormData } from "./utils";

const New = () => {
  const [status, setStatus] = useState("published");

  const { t } = useTranslation();

  const formikRef = useRef();

  const { mutate: createPost, isLoading } = useCreatePost();

  const history = useHistory();

  const handleSubmit = async postData => {
    const payload = getPayloadFromFormData(postData, status);

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
              <ActionBlock
                {...{ status, setStatus, onClick: handleSubmitButtonClick }}
              />
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
