import { getFromLocalStorage } from "utils/storage";

export const subscribeToPdfDownloadChannel = ({
  consumer,
  setProgress,
  generatePdf,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const pdfDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "PdfDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        generatePdf();
      },
      received(data) {
        const { progress } = data;
        setProgress(progress);
      },
    }
  );

  return pdfDownloadSubscription;
};
