import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPdfDownloadChannel } from "channels/pdfDownloadChannel";
import ProgressBar from "components/commons/ProgressBar";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { Modal, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const { Header, Body } = Modal;

const DownloadPdf = ({ isOpen, onClose, slug }) => {
  const [progress, setProgress] = useState(0);

  const { t } = useTranslation();

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf({ slug });
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download({ slug });
      FileSaver.saveAs(data, `${slug}.pdf`);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      subscribeToPdfDownloadChannel({
        consumer,
        setProgress,
        generatePdf,
      });
    }

    return () => {
      consumer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
    }
  }, [progress]);

  return (
    <Modal {...{ isOpen, onClose }}>
      <Header>
        <Typography style="h2" weight="bold">
          {t("titles.downloadPdf")}
        </Typography>
      </Header>
      <Body>
        <ProgressBar progress={progress} />
      </Body>
    </Modal>
  );
};

export default DownloadPdf;
