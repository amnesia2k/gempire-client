# **Gempire: A Premium E-commerce Experience 💎**

Welcome to Gempire, a sophisticated e-commerce platform built with Next.js that offers a seamless shopping experience and a robust administrative dashboard. This project showcases modern web development practices, focusing on performance, user experience, and a scalable architecture. It's designed to be both aesthetically pleasing for customers and highly functional for administrators managing products and orders.

## **Getting Started**

Follow these straightforward steps to get Gempire up and running on your local machine.

### **1. Clone the Repository**

First, grab the project's source code:

```bash
git clone https://github.com/amnesia2k/gempire-client.git
cd gempire-client
```

### **2. Install Dependencies**

This project uses `pnpm` as its package manager. Ensure you have it installed globally (`npm install -g pnpm`). Then, install the project dependencies:

```bash
pnpm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root of your project based on the `.env.example` file. While the example currently doesn't specify any unique variables, you would typically add API keys, database URLs, or other sensitive information here.

```
# .env.example contains placeholders for future environment variables.
# No sensitive keys are directly needed for a basic client-side setup.
```

### **4. Run the Development Server**

Start the Next.js development server:

```bash
pnpm run dev
```

The application will now be accessible at `http://localhost:3000`.

## **Usage**

Gempire features a dual interface: a public-facing storefront for customers and a secure dashboard for administrators.

### **🛒 Customer Storefront**

Navigate to `http://localhost:3000` to explore the customer view.

*   **Browse Products:** Discover products organized by categories. You can filter products to easily find what you're looking for.
*   **Product Details:** Click on any product to view its detailed description, price, and available stock.
*   **Add to Cart:** Effortlessly add desired items to your shopping cart. The cart icon in the navigation dynamically updates with the item count.
*   **Manage Cart:** In the cart page, adjust quantities, remove items, and review your order summary.
*   **Checkout Process:** Proceed to a simplified checkout form to place an order. Upon successful order placement, you'll receive an order ID and instructions to connect via WhatsApp for payment.
*   **Theme Toggle:** Switch between light and dark modes to suit your preference.

### **⚙️ Admin Dashboard**

Access the administrative panel via `http://localhost:3000/dash-access`.

*   **Secure Access:** Enter the access code (configured on the backend) to gain entry to the dashboard.
*   **Dashboard Overview:** Get a quick glance at key metrics like total sales, total products, and order statistics.
*   **Product Management:**
    *   **View All Products:** See a comprehensive list of all products, including their IDs, names, prices, stock, and categories.
    *   **Add New Product:** Easily add new products with details like name, price, stock, description, and multiple images. You can also create new categories on the fly.
    *   **Edit Product:** Update existing product information, including modifying details and images.
    *   **View Product Details:** Dive into the specifics of each product, including its unique ID, images, and full description.
*   **Order Management:**
    *   **View All Orders:** Access a detailed table of all customer orders.
    *   **View Order Details:** Inspect individual orders, see the items purchased, customer shipping information, and update the order's status (e.g., Ordered, Shipped, Delivered, Cancelled).
*   **Responsive Sidebar:** The dashboard features a responsive sidebar for easy navigation, adapting to different screen sizes.

## **Key Features**

*   **Responsive Storefront:** A fluid, mobile-first design ensuring a great shopping experience on any device.
*   **Comprehensive Admin Dashboard:** Tools for full product lifecycle management (create, read, update, delete) and order tracking.
*   **Dynamic Cart System:** Persistent shopping cart with real-time quantity updates and total calculations, powered by Zustand.
*   **Category Filtering & Pagination:** Effortlessly browse products by category and navigate through paginated results.
*   **Image Management:** Seamless image uploads with Cloudinary integration for efficient storage and delivery.
*   **Robust Data Handling:** Utilizes `@tanstack/react-query` for efficient, cached, and performant data fetching.
*   **Modern UI Components:** Built with `shadcn/ui` components for a consistent and accessible user interface.
*   **Dark/Light Mode:** Provides a comfortable viewing experience in various lighting conditions.
*   **Interactive Animations:** Enhances user experience with subtle animations powered by Lottie.

## **Technologies Used**

| Technology       | Description                                                                                                   | Link                                                               |
| :--------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| **Next.js**      | A React framework for building fast web applications, supporting server-side rendering and static generation. | [https://nextjs.org/](https://nextjs.org/)                         |
| **TypeScript**   | A strongly typed superset of JavaScript that enhances code quality and developer experience.                  | [https://www.typescriptlang.org/](https://www.typescriptlang.org/) |
| **Tailwind CSS** | A utility-first CSS framework for rapidly building custom designs.                                            | [https://tailwindcss.com/](https://tailwindcss.com/)             |
| **shadcn/ui**    | A collection of reusable components built with Radix UI and Tailwind CSS.                                     | [https://ui.shadcn.com/](https://ui.shadcn.com/)                   |
| **Zustand**      | A small, fast, and scalable bear-necessities state-management solution.                                       | [https://zustand-demo.pmnd.rs/](https://zustand-demo.pmnd.rs/)     |
| **React Query**  | Powerful asynchronous state management for React, simplifying data fetching, caching, and synchronization.   | [https://tanstack.com/query/latest](https://tanstack.com/query/latest) |
| **Cloudinary**   | Cloud-based service for managing images and videos, including transformations and delivery.                   | [https://cloudinary.com/](https://cloudinary.com/)                 |
| **Axios**        | A promise-based HTTP client for making API requests.                                                         | [https://axios-http.com/](https://axios-http.com/)                 |
| **Sonner**       | An opinionated toast component for React.                                                                     | [https://sonner.emilkowalski.no/](https://sonner.emilkowalski.no/) |
| **Lucide React** | A beautiful and consistent icon library.                                                                      | [https://lucide.dev/](https://lucide.dev/)                         |
| **Lottie**       | A library for rendering After Effects animations exported as JSON.                                            | [https://lottiefiles.com/](https://lottiefiles.com/)               |

## **Contributing**

I welcome contributions to enhance Gempire! If you have suggestions or want to report an issue, please feel free to open one.

Here’s how you can contribute:

*   🍴 **Fork** the repository.
*   👯‍♀️ **Clone** your forked repository to your local machine.
*   🌿 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   🚀 **Make your changes** and test them thoroughly.
*   ➕ **Add and commit** your changes: `git add . && git commit -m "feat: your descriptive message"`.
*   ⬆️ **Push** your changes to your forked repository: `git push origin feature/your-feature-name`.
*   🔄 **Open a pull request** from your forked repository to the `main` branch of this repository.

I appreciate your efforts to improve this project!

## **License**

This project is not currently licensed.

## **Author**

Developed with passion and precision by:

**Olatilewa**

*   GitHub: [@amnesia2k](https://github.com/amnesia2k)
*   LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
*   Portfolio: [Your Portfolio URL](https://yourportfolio.com)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)