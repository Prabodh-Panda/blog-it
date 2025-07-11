import React from "react";

import { Header } from "components/commons";
import { Button } from "neetoui";
import { Form, Input, Textarea } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const New = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col">
      <Header title={t("titles.newBlogPost")} />
      <div className="w-full flex-1 px-16 pb-10">
        <Form className="flex h-full flex-col justify-start rounded-lg border p-10">
          <div>
            <Input
              required
              label={t("labels.title")}
              maxLength={125}
              name="title"
              placeholder={t("placeholders.title")}
            />
            <Textarea
              required
              className="my-4"
              label={t("labels.description")}
              maxLength={10000}
              name="description"
              placeholder={t("placeholders.description")}
            />
          </div>
          <div className="ml-auto mt-auto space-x-2">
            <Button style="secondary">{t("labels.cancel")}</Button>
            <Button className="bg-black" type="submit">
              {t("labels.submit")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default New;
