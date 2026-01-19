/* eslint-disable */
const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/getAllCategories`,
      {
        next: { tags: ['categories'] },
      },
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
};

const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/GetAllProducts`,
      {
        next: { tags: ['products'] },
      },
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error)
  }

};


const generateSlug = (text) => {
  if (!text) return ' ';
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};


const fetchSubCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/get-all-subCategories`, {
      next: { tags: ['subCategories'] },
    }
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error)
  }
};




const fetchBlogs = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`,
      {
        next: { tags: ['blogs'] },
      },
    );

    let blogs = response.json()

    return blogs;
  } catch (error) {
    console.log(error)
  }

};


module.exports = {fetchCategories,fetchProducts,fetchSubCategories,fetchBlogs, generateSlug};
