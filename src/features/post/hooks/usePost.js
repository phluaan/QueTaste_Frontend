import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/postSlice";

const usePost = () => {
    const dispatch = useDispatch();
    const { allPosts, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return {
        allPosts,
        loading: loading.all,
        error,
    };
};

export default usePost;
