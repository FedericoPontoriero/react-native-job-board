import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import { useEffect, useState } from "react";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const options = {
  //   method: "GET",
  //   url: `https://jsearch.p.rapidapi.com/search`,
  //   params: {
  //     query: "React developer",
  //     num_pages: 1,
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "70a6227c61mshc83bc7dd3019853p1ed17cjsncf39cce2ee5e",
  //     "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  //   },
  // };

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.request(options);
  //     setData(response.data.data);
  //     setIsLoading(false);
  //   } catch (err) {
  //     setError(error);
  //     alert("There was an error");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const refetch = () => {
  //   setIsLoading(true);
  //   fetchData();
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text> Something went wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
