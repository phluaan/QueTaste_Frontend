import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostDetail } from "../slices/postSlice";

const usePostDetail = ({ admin = false } = {}) => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { postDetail, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        if (slug) {
        dispatch(fetchPostDetail({ slug, admin }));
        }
    }, [slug, admin, dispatch]);

    const [activeTab, setActiveTab] = useState("content");
    return { postDetail, loading: loading.detail, error, activeTab, setActiveTab };
};

export default usePostDetail;