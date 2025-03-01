"use client";

import { useEffect, useState } from "react";
import { countdownTime } from "../../store/countdownTime";
import CountdownTimeType from "../../type/CountdownType";
import ModalCart from "../../components/Modal/ModalCart";

export default function CountdownProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [serverTimeLeft, setServerTimeLeft] = useState<CountdownTimeType | null>(null);

  useEffect(() => {
    setServerTimeLeft(countdownTime());
  }, []);

  return (
    <>
      {serverTimeLeft && <ModalCart serverTimeLeft={serverTimeLeft} />}
      {children}
    </>
  );
}