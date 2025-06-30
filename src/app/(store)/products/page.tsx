// import React from "react";
// import Products from "./products-page";

// export default function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { category?: string };
// }) {
//   return (
//     <div className="p-5 md:px-10 md:py-5">
//       <Products selectedCategory={searchParams.category} />
//     </div>
//   );
// }

import React from "react";
import Products from "./products-page";

export default function ProductsPage() {
  return (
    <div className="p-5 md:px-10 md:py-5">
      <Products />
    </div>
  );
}
