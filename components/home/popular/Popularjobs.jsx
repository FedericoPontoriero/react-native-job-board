import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState();

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
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
                item={item}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
