// hooks/useSaveLoans.ts
import { useEffect, useState } from "react";

export const useLiquidityStorage = () => {
  const keyString = "liquidity";

  const { loans } = useGetLoans(keyString);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const saveLoans = (loans: any[]) => {
    try {
      const replacer = (key: string, value: any) =>
        typeof value === "bigint" ? value.toString() : value;
      localStorage.setItem(keyString, JSON.stringify(loans, replacer));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Couldn't save loans:", error);
    }
  };

  return { saveLoans, status, loans };
};


export const useLoansStorage = () => {
  const keyString = "loans";

  const { loans } = useGetLoans(keyString);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const saveLoans = (loans: any[]) => {
    try {
      const replacer = (key: string, value: any) =>
        typeof value === "bigint" ? value.toString() : value;
      localStorage.setItem(keyString, JSON.stringify(loans, replacer));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error("Couldn't save loans:", error);
    }
  };

  return { saveLoans, status, loans };
};

const useGetLoans = (itemString: string) => {
  const [loans, setLoans] = useState<any[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    try {
      const savedLoans = localStorage.getItem(itemString);
      if (savedLoans) {
        setLoans(JSON.parse(savedLoans));
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      console.error("Couldn't retrieve loans:", error);
    }
  }, []);

  return { loans, status };
};
