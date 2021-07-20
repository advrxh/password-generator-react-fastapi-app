import axios from "axios";

export const fetchData = async (args, length) => {
  const data = await axios.get(
    `http://localhost:8000/gen?len=${length}&caps=${args.caps}&digits=${args.digits}&spcl_char=${args.specialChar}`
  );

  return data.data.data.password;
};
