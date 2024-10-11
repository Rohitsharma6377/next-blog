export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//flags short title/description
export const metaFlag = (title, description) => {
  let flag = true;

  if (
    title.length >= 50 &&
    title.length <= 60 &&
    description?.length >= 140 &&
    description?.length <= 155
  ) {
    flag = false;
  } else if (
    title.length >= 50 &&
    title.length <= 60 &&
    description === undefined
  ) {
    flag = false;
  }

  return flag;
};

//formats date coming from DB
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date
    .toLocaleString("en-US", { month: "short" })
    .toUpperCase()
    .split(0, 3);
  const year = String(date.getFullYear()).slice(-2);

  return `${day}-${month}-${year}`;
};

export const slugify = (str) => {
  // Convert the string to lowercase
  str = str.toLowerCase();

  // Replace spaces with hyphens
  str = str.replace(/\s+/g, "-");

  // Remove all special characters except hyphens
  str = str.replace(/[^\w\-]+/g, "");

  // Remove multiple consecutive hyphens
  str = str.replace(/\-\-+/g, "-");

  // Trim hyphens from the start and end of the string
  str = str.replace(/^-+/, "");
  str = str.replace(/-+$/, "");

  return str;
};

//fetches page data
// import axios from "axios";

// export async function fetchPageData(currentPageUrl) {
//   const response0 = await axios.post(`${baseUrl}/api/page/get-page`, {
//     currentPageUrl,
//   });
//   const pages = response0.data[0];
//   const { id } = response0.data[0];

//   const response1 = await axios.post(`${baseUrl}/api/point/get-point`, {
//     model: "page",
//     model_id: id,
//   });
//   const points = separateByName(response1.data.points);

//   const response2 = await fetch(
//     `${baseUrl}/api/pages/banners?currentPageUrl=${encodeURIComponent(currentPageUrl)}`,
//   );
//   const banners = await response2.json();

//   const response3 = await axios.post(
//     `${baseUrl}/api/testimonial/get-testimonial`,
//     { model: "page", model_id: id },
//   );
//   const testimonials = response3.data.testimonials.filter(
//     (testimonial) => testimonial.status === 1,
//   );

//   const response4 = await axios.post(`${baseUrl}/api/faq/get-faq`, {
//     model: "page",
//     model_id: id,
//   });
//   const faqs = response4.data.filter((faq) => faq.status === 1);

//   return { pages, points, banners, testimonials, faqs };
// }



export function filterDataBySearchTerm(dataArray, searchTerm) {
  if (!searchTerm) return dataArray;

  const searchTermLower = searchTerm.toLowerCase();

  return dataArray.filter((item) => {
    // Check if any key in the object contains the search term
    return Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTermLower);
      }
      return false;
    });
  });
}


export async function fetchPageData(pageUrl) {
  const page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
  const banners = await fetchDataFromDB({url: `/api/user/banners?model=${page[0].model}&model_id=${page[0].id}`});
  const testimonials = await fetchDataFromDB({url: `/api/user/testimonials?model=${page[0].model}&model_id=${page[0].id}`});
  const faqs = await fetchDataFromDB({url: `/api/user/faqs?model=${page[0].model}&model_id=${page[0].id}`});
  const data = await fetchDataFromDB({url: `/api/user/points?model=${page[0].model}&model_id=${page[0].id}`});
  const points = separateByName(data);

  return { page, points, banners, testimonials, faqs };
}


export async function fetchDataFromDB({url}) {
  const response = await fetch(`${baseUrl}${url}`);
  const results = await response.json();
  
  // const output = filterAndSort(results);
  return results;
}


export function filterAndSort(arr) {
  return arr
    .filter(item => {
      // Check if the necessary properties exist and have valid values
      return (
        item.hasOwnProperty('status') && 
        parseInt(item.status) === 1 && 
        item.hasOwnProperty('media_id') && 
        item.media_id !== null
      );
    })
    .sort((a, b) => {
      const aHasDisplayOrder = a.hasOwnProperty('display_order') && a.display_order !== null;
      const bHasDisplayOrder = b.hasOwnProperty('display_order') && b.display_order !== null;

      if (!aHasDisplayOrder) return 1;
      if (!bHasDisplayOrder) return -1;
      return a.display_order - b.display_order;
    });
}


export function sortByDisplayOrder(arr) {
  return arr.sort((a, b) => {
    if (a.display_order === null) return 1;
    if (b.display_order === null) return -1;
    return a.display_order - b.display_order;
  });
}

export function filterByStatus(arr) {
  return arr.filter(item => parseInt(item.status) === 1);
}


export function separateByName(array) {
  const nameMap = {};

  for (const obj of array) {
    const name = obj.name;

    if (nameMap.hasOwnProperty(name)) {
      nameMap[name].push(obj);
    } else {
      nameMap[name] = [obj];
    }
  }

  return Object.values(nameMap);
}

export const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const handleTableEdit = (data, openForm, setFormData) => {
  // const selectedEntry = data[index];
  setFormData(data);
  // console.log('....', data);
  
  openForm();
};

export const test = (value) => {
  console.log('working', Math.floor(Math.random()*10), value);
}