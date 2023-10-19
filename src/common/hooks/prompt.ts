import { useEffect } from "react";
import { unstable_usePrompt } from "react-router-dom";

const messageText =
  "Masz niezapisane zmiany. Czy na pewno chcesz opuścić tę stronę?";

export const usePrompt = (when: boolean) => {
  unstable_usePrompt({
    when,
    message: messageText,
  });

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent): string => {
      if (when) {
        event.preventDefault();
      }

      return (event.returnValue = messageText);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [when]);
};
