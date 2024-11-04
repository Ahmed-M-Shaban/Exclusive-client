import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://192.168.1.7:3000/api/v1";

/**
 *
 * @param {String} idSelector
 * @param {Number} amount
 * @param {'left' | 'right'} direction
 */
export const handleScroll = (idSelector, amount, direction) => {
  const scrollContainer = document.querySelector(idSelector);

  // Determine new scroll position based on direction
  switch (direction) {
    case "left":
      scrollContainer.scrollBy({
        top: 0,
        left: -amount,
        behavior: "smooth",
      });
      break;

    case "right":
      scrollContainer.scrollBy({
        top: 0,
        left: amount,
        behavior: "smooth",
      });
      break;

    default:
      break;
  }
};

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleError = (err) => {
  if (
    err.error.status === "FETCH_ERROR" ||
    err.error.status === "ERR_INTERNET_DISCONNECTED"
  ) {
    toast.error(
      "Sorry, we're currently facing a some issues. Please bear with us."
    );
  }
};
