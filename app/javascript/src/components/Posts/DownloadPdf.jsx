import React, { useState, useEffect } from "react";

import postsApi from "apis/posts";
import Logger from "js-logger";
import { Toastr } from "neetoui";
import { useParams } from "react-router-dom";

const DownloadPdf = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf({ slug });
    } catch (error) {
      Logger.log(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const { data } = await postsApi.download({ slug });
      saveAs({ blob: data, fileName: "blogit_report.pdf" });
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <div>
      <div className="flex flex-col gap-y-8">
        <h1>Download Report</h1>
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default DownloadPdf;
