import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fixedFooter } from "../utils/footerSlice";



const FooterHandler = ({ data }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if ( data?.length === 0) {
            console.log("true")
            dispatch(fixedFooter(true));  // Fix footer if data is empty
        } else {
            dispatch(fixedFooter(false)); // Unfix footer if data is present
            console.log("false "+ data?.length);
        }
        console.log("footerHandler")
    }, [data, dispatch]);

    return null; // No UI, only state management
};

export default FooterHandler;
