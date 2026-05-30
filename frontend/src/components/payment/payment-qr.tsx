"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface PaymentQRCodeProps {
  value: string;
}

export default function PaymentQRCode({ value }: PaymentQRCodeProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    if (!value) {
      setDataUrl("");
      return;
    }

    QRCode.toDataURL(value, {
      errorCorrectionLevel: "H",
      width: 280,
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch((error) => {
        console.error("Failed to generate QR code", error);
      });

    return () => {
      cancelled = true;
    };
  }, [value]);

  if (!dataUrl) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/70">
        Đang tạo mã QR...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <p className="mb-4 text-sm font-semibold text-white">
        Quét mã QR để tiếp tục thanh toán
      </p>
      <img
        src={dataUrl}
        alt="Mã QR thanh toán"
        className="mx-auto h-72 w-72 rounded-2xl bg-white p-2"
      />
    </div>
  );
}
