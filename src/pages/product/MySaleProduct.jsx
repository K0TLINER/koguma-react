import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopReturnBar from "./TopReturnBar";
import Swal from "sweetalert2";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  AppBar,
  Alert,
  AlertTitle,
} from "@mui/material";
import MyList from "../../component/product/MyList";
import MySaledList from "../../component/product/MySaledList";

import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import {
  listProductBySaleAPI,
  listProductByBuyAPI,
  raiseProductAPI,
  updateTradeStateAPI,
  deleteProductAPI,
} from "../../apis/api/Product";
import { getMemberAPI } from "../../apis/api/member";

const MySaleProduct = () => {
  //   const { clubId } = useParams();
  const navigate = useNavigate();
  const [change, setChange] = useState(0);
  const [selectedActionSale, setSelectedActionSale] = useState([
    {
      name: "예약중",
      action: async (productId) => {
        await Swal.fire({
          html: "상품을 예약중으로 바꾸겠습니까?",
          icon: "info",
          width: "60%",
          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
          confirmButtonText: "네", // confirm 버튼 텍스트 지정
          cancelButtonText: "아니요", // cancel 버튼 텍스트 지정
        }).then((result) => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면

            Swal.fire({
              html: `상품을 예약중으로 바꿨습니다.`,
              icon: "success",
            });
            updateTradeState(productId, "RESERVATION");
          }
        });
        setChange(change + 1);
      },
    },
    {
      name: "거래완료",
      action: (productId) => navigate(`/product/get/seller/${productId}`),
    },
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      // action: (productId) => updateTradeState(productId, "HIDE"),
      action: (productId) => {
        Swal.fire({
          html: "<b>상품을 숨기겠습니까?</b><br/>숨긴 상품은 상품 목록에서 볼수없습니다.",
          icon: "info",
          width: "60%",
          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
          cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
          confirmButtonText: "네", // confirm 버튼 텍스트 지정
          cancelButtonText: "아니요", // cancel 버튼 텍스트 지정
        }).then((result) => {
          // 만약 Promise리턴을 받으면,
          if (result.isConfirmed) {
            // 만약 모달창에서 confirm 버튼을 눌렀다면

            Swal.fire({
              html: `상품을 숨겼습니다.`,
              icon: "success",
            });
            updateTradeState(productId, "HIDE");
          }
        });
      },
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionSaled, setSelectedActionSaled] = useState([
    {
      name: "판매중",
      action: (productId) => updateTradeState(productId, "SALE"),
    },
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      action: (productId) => updateTradeState(productId, "HIDE"),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionReservation, setSelectedActionReservation] = useState([
    {
      name: "판매중",
      action: (productId) => updateTradeState(productId, "SALE"),
    },
    {
      name: "거래완료",
      action: (productId) => navigate(`/product/get/seller/${productId}`),
    },
    {
      name: "게시글 수정",
      action: (productId) => navigate(`/product/update/${productId}`),
    },
    {
      name: "숨기기",
      action: (productId) => updateTradeState(productId, "HIDE"),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);
  const [selectedActionHide, setSelectedActionHide] = useState([
    {
      name: "게시글 수정",
      action: (productId) => console.log(productId),
    },
    {
      name: "삭제",
      action: (productId) => deleteProduct(productId),
    },
  ]);

  const [selectedMenu, setSelectedMenu] = useState("판매 중");
  const [selectedMenuType, setSelectedMenuType] = useState("SALE");
  const menuList = ["판매 중", "판매 완료", "예약 중", "숨김 중"];
  const menuListEng = ["SALE", "SALED", "RESERVATION", "HIDE"];
  const [member, setMember] = useState();
  const [alert, setAlert] = useState(null);

  const getProductReview = (productId) => {
    navigate(`/product/review/get/${productId}`);
  };
  const changeHide = (productId) => {
    updateTradeState(productId, "RESTORE");
  };

  const handleMenuClick = (idx) => {
    setSelectedMenu(menuList[idx]);
    setSelectedMenuType(menuListEng[idx]);
  };

  const getProduct = (productId) => {
    navigate(`/product/get/${productId}`);
  };

  const raiseProduct = async (productId) => {
    try {
      const response = await raiseProductAPI(productId);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const updateTradeState = async (prodcutId, type) => {
    // 상품 상태 변경 axios 요청
    await updateTradeStateAPI(prodcutId, type);
  };
  const updateTradeStateByReservation = async (prodcutId) => {
    //예약중인 상품을 판매중으로 변경
    await updateTradeStateAPI(prodcutId, "SALE");
  };
  const deleteProduct = async (productId) => {
    await deleteProductAPI(productId);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberAPI();
        setMember(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Back url="/member/profile" />
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#ffffff",
          zIndex: 90,
        }}
      >
        <MarginEmpty value={"50px"} />
        <CardHeader
          sx={{ m: 4, color: "black" }}
          title="나의 판매내역"
          action={
            member && (
              <Avatar
                aria-label="recipe"
                sx={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <img
                  src={member.profileURL}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                />
              </Avatar>
            )
          }
        />

        <div style={{ display: "flex", width: "100%" }}>
          {menuList.map((menu, idx) => (
            <Button
              key={menu}
              onClick={() => handleMenuClick(idx)}
              variant={selectedMenu === menu ? "contained" : "outlined"}
              color="secondary"
              style={{ flex: 1 }}
            >
              {menu}
            </Button>
          ))}
        </div>
      </AppBar>

      <hr></hr>

      {selectedMenu === "판매 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="끌어올리기"
          onClick={raiseProduct}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSale}
          setChange={setChange}
          change={change}
        />
      )}

      {selectedMenu === "판매 완료" && (
        <MySaledList
          selectedMenuType={selectedMenuType}
          buttonNM="받은 후기 보기"
          onClick={getProductReview}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionSaled}
        />
      )}
      {selectedMenu === "예약 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="예약 해제"
          onClick={updateTradeStateByReservation}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionReservation}
        />
      )}
      {selectedMenu === "숨김 중" && (
        <MyList
          selectedMenuType={selectedMenuType}
          buttonNM="숨기기 해제"
          onClick={changeHide}
          onClickGetProduct={getProduct}
          selectedActions={selectedActionHide}
        />
      )}
    </>
  );
};

export default MySaleProduct;
