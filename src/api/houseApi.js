
import axios from "axios";



const baseUrl = process.env.REACT_APP_SERVER_API_URL;


export const getItems = async () => { // 목록
    try {
        const { data } = await axios.get(`${baseUrl}/itempage`);
        console.log(data);
        return data;
    } catch (e) {
        alert(e.response.data.msg);
    }
}

export const getHouseDetail = async (id) => { // 상세
    try {
        const { data } = await axios.get(`${baseUrl}/detail/${id}`);
        return data;
    } catch (e) {
        throw new Error(e.response.data.msg);
    }
}


export const postHousePost = async (post) => { // 사진전송
    try {
        const token = localStorage.getItem("token");
        console.log('🐹게시요청');

        console.log("postDesk" + JSON.stringify(post));
        const profileExt = post.imgUrl.name.split('.').pop();


        const formImageData = new FormData();
        formImageData.append('image', post.imgUrl, `image.${profileExt}`)

        const imageData = await axios({
            method: "post",
            url: `${baseUrl}/detail/image`,
            data: formImageData,
            // withCredentials: true,
            // headers: { "Authorization": `Bearer ${token}` }
        });

        console.log(JSON.stringify(imageData) + "🏠")
        const dataWithUrl = { ...post, imgUrl: imageData.data.url }
        const formedToken = { headers: { "Cowdog": `Bearer ${token}` } };
        const { data } = await axios.post(`${baseUrl}/detail`, dataWithUrl, formedToken);
        return data;
    } catch (e) {
        alert(e.response.data.msg);
    }
}


// export const putModifyDesk = async ({ input, deskId }) => {
//     try {
//         const token = localStorage.getItem("token");
//         console.log('🐹수정요청' + deskId);

//         let profilePath;
//         let deskImgPath;

//         if (typeof input.profile === "object") {
//             const profileExt = input.profile.name.split('.').pop();
//             const formProfileData = new FormData();
//             formProfileData.append('file', input.profile, `profile.${profileExt}`)
//             const response = await axios({
//                 method: "post",
//                 url: `${baseUrl}/file`,
//                 data: formProfileData,
//                 headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
//             });
//             profilePath = response.data.path;
//         } else if (typeof input.profile === "string") {
//             profilePath = input.profile;
//         }

//         if (typeof input.deskImg === "object") {
//             const deskImgExt = input.deskImg.name.split('.').pop();
//             const formDeskData = new FormData();
//             formDeskData.append('file', input.deskImg, `desk.${deskImgExt}`)
//             const response = await axios({
//                 method: "post",
//                 url: `${baseUrl}/file`,
//                 data: formDeskData,
//                 headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
//             });
//             deskImgPath = response.data.path;
//         } else if (typeof input.deskImg === "string") {
//             deskImgPath = input.deskImg;
//         }

//         const dataWithUrl = { ...input, deskImg: deskImgPath, profile: profilePath }
//         const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
//         const { data } = await axios.put(`${baseUrl}/desks/${deskId}`, dataWithUrl, formedToken);
//         return data;
//     } catch (e) {
//         alert(e.response.data.msg);
//     }
// }


// export const deleteDesk = async (deskId) => { // 책상삭제 fix
//     try {
//         const token = localStorage.getItem("token");
//         console.log('🐱' + deskId);

//         const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//         const response = await axios.delete(`${baseUrl}/desks/${deskId}`, sentToken);
//         console.log(JSON.stringify(response));
//         const message = await response.data.msg;
//         return message;
//     } catch (e) {
//         alert(e.response.data.msg);
//     }

// }



// export const postSignUp = async (user) => { // 회원가입
//     try {
//         const { data } = await axios.post(`${baseUrl}/auth/signup`, user);
//         return data;
//     } catch (e) {
//         alert(e.response.data.msg);
//     }
// }

// export const postLogIn = async (user) => { // 로그인
//     try {
//         const { data } = await axios.post(`${baseUrl}/auth/login`, user);
//         console.log(data);
//         const result = await data.token.substring(6);
//         return result;
//     } catch (e) {
//         throw new Error(e.response.data.msg);
//         // alert(e.response.data.msg);
//     }
// }

// export const postSignOut = async (token) => { // 로그아웃
//     try {
//         const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//         const { data } = await axios.post(`${baseUrl}/auth/logout`, sentToken);
//         return data;
//     } catch (e) {
//         alert(e.response.data.msg);
//     }

// }


// export const getMyInfo = async (token) => { // 내 정보fix    
//     try {
//         console.log(token + '토큰');
//         const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//         const { data } = await axios.get(`${baseUrl}/desks/user`, sentToken);
//         return data;
//     } catch (e) {
//         alert(e.response.data.msg);
//     }
// }

// export const getIsValidId = async (userId) => {
//     try {
//         const { data } = await axios.post(`${baseUrl}/auth/signup/Id`, {

//             userId: userId,

//         });
//         return data.isMatchId; // 서버에서 true 또는 false를 반환한다고 가정
//     } catch (e) {
//         console.error(e);
//         return false;
//     }
// }

