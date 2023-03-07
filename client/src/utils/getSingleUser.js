import { useQuery } from "@tanstack/react-query";
import newRequest from "./newRequest";

const getSingleUser = (id) => {

    const {  data } = useQuery({
        queryKey: [id],
        queryFn: async() => {
          return newRequest(`/user/${id}`).then(
            (res) => res.data
          );
        },
      });
      
      return data?.username
}

export default getSingleUser
