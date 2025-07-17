"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  QrCode,
  Link,
  MessageSquare,
  User,
  Download,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";

// Tell TS about the global QRious
declare global {
  interface Window {
    QRious?: new (config: {
      element: HTMLCanvasElement;
      value: string;
      size?: number;
      background?: string;
      foreground?: string;
      level?: "L" | "M" | "Q" | "H";
    }) => void;
  }
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  url: string;
}

// interface TabOption {
//   id: string;
//   label: string;
//   icon: React.ElementType;
// }

const QRCodeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"url" | "text" | "contact">("url");
  const [qrData, setQrData] = useState("");
  const [copied, setCopied] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement | null>(null);

  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
    url: "",
  });

  const formatUrl = (url: string): string => {
    const trimmed = url.trim();
    if (!trimmed) return "";
    return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const generateVCard = (contact: ContactInfo): string => {
    const normalizeUrl = (url: string) => {
      if (!url) return "";
      return url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    };

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${contact.lastName};${contact.firstName};;;`,
      `FN:${contact.firstName} ${contact.lastName}`,
      contact.organization && `ORG:${contact.organization}`,
      contact.phone && `TEL;TYPE=CELL:${contact.phone}`,
      contact.email && `EMAIL;TYPE=INTERNET:${contact.email}`,
      contact.url && `URL:${normalizeUrl(contact.url)}`,
      "END:VCARD",
    ];

    return lines.filter(Boolean).join("\n");
  };

  const createQR = (text: string) => {
    const container = qrContainerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    try {
      if (typeof window.QRious === "function") {
        new window.QRious({
          element: canvas,
          value: text,
          size: 300,
          background: "white",
          foreground: "black",
          level: "M",
        });
      }

      canvas.className = "w-full h-auto rounded-xl shadow-lg bg-white";
      canvas.style.maxWidth = "300px";
    } catch (err) {
      console.error("Error creating QR code with QRious:", err);
      generateFallbackQR(text);
    }
  };

  const generateFallbackQR = (text: string) => {
    const container = qrContainerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const encoded = encodeURIComponent(text);
    const img = document.createElement("img");
    img.src = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encoded}&choe=UTF-8`;
    img.alt = "QR Code";
    img.className = "w-full h-auto rounded-xl shadow-lg bg-white p-4";
    img.style.maxWidth = "300px";

    img.onerror = () => {
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&format=png&margin=10`;
    };

    container.appendChild(img);
  };

  const generateQRCode = useCallback(async (text: string) => {
    if (!text.trim()) {
      qrContainerRef.current?.replaceChildren();
      return;
    }

    if (!window.QRious) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
      script.onload = () => createQR(text);
      script.onerror = () => generateFallbackQR(text);
      document.head.appendChild(script);
    } else {
      createQR(text);
    }
  }, []);

  useEffect(() => {
    let data = "";

    switch (activeTab) {
      case "url":
        data = formatUrl(urlInput);
        break;
      case "text":
        data = textInput;
        break;
      case "contact":
        if (
          contactInfo.firstName ||
          contactInfo.lastName ||
          contactInfo.phone ||
          contactInfo.email
        ) {
          data = generateVCard(contactInfo);
        }
        break;
    }

    setQrData(data);
    void generateQRCode(data); // <-- 👈 this solves the no-floating-promises
  }, [activeTab, urlInput, textInput, contactInfo, generateQRCode]);

  const downloadQRCode = () => {
    if (!qrData) return;

    const canvas = qrContainerRef.current?.querySelector("canvas") as
      | HTMLCanvasElement
      | undefined;
    const img = qrContainerRef.current?.querySelector("img") as
      | HTMLImageElement
      | undefined;

    const link = document.createElement("a");
    link.download = `qr-code-${activeTab}.png`;

    if (canvas) {
      link.href = canvas.toDataURL("image/png");
      link.click();
    } else if (img?.src) {
      link.href = img.src;
      link.click();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const resetForm = () => {
    setUrlInput("");
    setTextInput("");
    setContactInfo({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      organization: "",
      url: "",
    });
    setQrData("");
    qrContainerRef.current?.replaceChildren();
  };

  type TabType = "url" | "text" | "contact";

  const tabs: { id: TabType; label: string; icon: LucideIcon }[] = [
    { id: "url", label: "URL", icon: Link },
    { id: "text", label: "Text", icon: MessageSquare },
    { id: "contact", label: "Contact", icon: User },
  ];

  return (
    <div className="min-h-screen to-indigo-100 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600">
            <QrCode className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
            QR Code Generator
          </h1>
          <p className="text-lg">
            Generate QR codes for URLs, text, and contact information
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-2xl">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "border-b-2 border-purple-600 text-purple-600"
                        : ""
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <h2 className="mb-4 text-2xl font-semibold">
                  {activeTab === "url" && "Enter URL"}
                  {activeTab === "text" && "Enter Text"}
                  {activeTab === "contact" && "Contact Information"}
                </h2>

                {/* URL Input */}
                {activeTab === "url" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="example.com or https://example.com"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter a website URL. If you don&apos;t include http://,
                      we&apos;ll add https:// automatically.
                    </p>
                  </div>
                )}

                {/* Text Input */}
                {activeTab === "text" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Text Content
                    </label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter any text to generate QR code..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}

                {/* Contact Input */}
                {activeTab === "contact" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="John"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Doe"
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 123-4567"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="john.doe@example.com"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Organization
                      </label>
                      <input
                        type="text"
                        value={contactInfo.organization}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            organization: e.target.value,
                          })
                        }
                        placeholder="Company Name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Website
                      </label>
                      <input
                        type="url"
                        value={contactInfo.url}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            url: e.target.value,
                          })
                        }
                        placeholder="https://example.com"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={resetForm}
                  className="w-full rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
                >
                  Clear All Fields
                </button>
              </div>

              {/* QR Code Display Section */}
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-2xl font-semibold">Generated QR Code</h2>

                <div className="w-full max-w-sm rounded-2xl border p-8">
                  {qrData ? (
                    <div className="text-center">
                      <div ref={qrContainerRef} className="flex justify-center">
                        {/* QR code will be dynamically inserted here */}
                      </div>
                      <p className="mt-4 text-sm text-gray-600">
                        Scan this QR code with your device
                      </p>
                    </div>
                  ) : (
                    <div className="py-16 text-center">
                      <QrCode className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500">
                        Fill in the form to generate your QR code
                      </p>
                    </div>
                  )}
                </div>

                {qrData && (
                  <div className="flex w-full max-w-sm gap-4">
                    <button
                      onClick={downloadQRCode}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium transition-all duration-200 hover:bg-gray-200"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Data
                        </>
                      )}
                    </button>
                  </div>
                )}

                {qrData && (
                  <div className="w-full max-w-sm">
                    <h3 className="mb-2 text-sm font-medium">QR Code Data:</h3>
                    <div className="max-h-32 overflow-y-auto rounded-lg bg-gray-100 p-3 text-xs text-gray-600">
                      <pre className="break-words whitespace-pre-wrap">
                        {qrData}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Generate QR codes instantly • No data stored • Free to use</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
