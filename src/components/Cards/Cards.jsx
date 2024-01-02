import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProfile } from "../../redux/userSlice";

function Cards() {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = JSON.parse(user);

        if (!token?.data) {
            return navigate("/login");
        } else {
            return navigate("/profile");
        }
    }, [navigate]);

    const dispatch = useDispatch();
    const { userid, username, image } = useSelector((state) => state.user);
    console.log(userid);
    const [imageUrl, setImageUrl] = useState(null);

    const imageUpload = async (e) => {
        e.preventDefault();

        console.log("jj", imageUrl);

        const formData = new FormData();
        formData.append("image", imageUrl);
        formData.append("userId", userid);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                userId: userid,
            },
            withCredentials: true,
        };

        try {
            const { data } = await axios.post("http://localhost:3001/profile", formData, config);

            dispatch(setProfile({ image: data.imageUrl, username, userid }));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={imageUpload}>
                    <div class="card pt-3 ms-2 mt-5" style={{ width: "300px" }}>
                        <img
                            className="mx-auto mt-4 card-img-top"
                            src={`/Images/${image}`}
                            alt="..."
                            style={{ width: "100px" }}
                        />
                        <h6 className="mx-auto mt-2">{username}</h6>
                        <div class="card-body">
                            <input className="ps-4" type="file" onChange={(e) => setImageUrl(e.target.files[0])} />
                            <input className=" mt-3 ms-4 btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cards;
