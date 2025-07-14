// "use client";

// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Lottie from "lottie-react";
// import orderSuccessAnimation from "@/lib/lottie/order-success";

// export default function Success() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("order-id");

//   const whatsappText = encodeURIComponent(
//     `Hello! 👋\n\nI just placed an order on your store 🎉\n\n🧾 Order ID: *#${orderId}*\n\nKindly confirm and share payment details. Thanks! 🙏`,
//   );

//   const whatsappLink = `https://wa.me/2348133769036?text=${whatsappText}`;

//   return (
//     <div className="flex flex-col items-center justify-center px-4 text-center">
//       {/* <CheckCircle className="mb-6 h-20 w-20 text-green-500" /> */}
//       {/* <iframe src="https://lottie.host/embed/52f194f3-ae3f-43eb-8ccd-d779eb4402ba/38O3sIqZ07.lottie"></iframe> */}
//       <Lottie
//         animationData={orderSuccessAnimation}
//         loop={false}
//         autoplay
//         style={{ width: 400, height: 400 }}
//       />

//       <h1 className="font-headline mb-4 text-3xl font-bold md:text-4xl">
//         Order Placed Successfully
//       </h1>
//       <p className="text-muted-foreground mb-2 text-lg">
//         Your Order ID: <span className="font-semibold">#{orderId}</span>
//       </p>

//       <Button asChild size="lg" className="mt-6">
//         <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
//           Proceed to WhatsApp to Make Payment
//         </a>
//       </Button>
//     </div>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import orderSuccessAnimation from "@/lib/lottie/order-success";
import { verifyTransaction } from "@/lib/api/payment";
import { toast } from "sonner";
import SplashLoader from "@/components/splash-loader";
import { useCartStore } from "@/context/cart-store";

export default function Success() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order-id");
  const reference = searchParams.get("tx-ref");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const { clearCart } = useCartStore();

  const whatsappText = encodeURIComponent(
    `Hello! 👋\n\nI just placed an order on your store 🎉\n\n🧾 Order ID: *#${orderId}*\n\nKindly confirm and share payment details. Thanks! 🙏`,
  );
  const whatsappLink = `https://wa.me/2348133769036?text=${whatsappText}`;

  useEffect(() => {
    const runVerification = async () => {
      if (!reference) return;
      try {
        const result = await verifyTransaction(reference);
        if (result.status === "success") {
          setVerified(true);
          toast.success("Payment verified successfully 🎉");
          // Optional: fire updateOrderStatus mutation here

          clearCart();
        } else {
          toast.error("Payment was not successful");
        }
      } catch (err) {
        toast.error("Could not verify payment");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void runVerification();
  }, [reference, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      {loading ? (
        <>
          {/* <Loader2 className="text-muted mb-6 h-16 w-16 animate-spin" />
          <h1 className="text-xl font-semibold">Verifying payment...</h1> */}

          <SplashLoader
            classes="flex h-screen w-full items-center justify-center"
            text="Verifying payment..."
          />
        </>
      ) : verified ? (
        <>
          <Lottie
            animationData={orderSuccessAnimation}
            loop={false}
            autoplay
            style={{ width: 400, height: 400 }}
          />
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Payment Verified
          </h1>
          <p className="text-muted-foreground mb-2 text-lg">
            Order ID: <span className="font-semibold">#{orderId}</span>
          </p>
          <Button asChild size="lg" className="mt-6">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Proceed to WhatsApp
            </a>
          </Button>
        </>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Payment Failed
          </h1>
          <p className="text-muted-foreground mt-2">Please try again.</p>
        </div>
      )}
    </div>
  );
}
