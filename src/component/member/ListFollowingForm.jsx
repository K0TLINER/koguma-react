import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    createTheme,
    IconButton,
    CircularProgress,
    Typography
} from '@mui/material';
import { authInstance } from "../../apis/utils/instance";
import { useNavigate } from 'react-router-dom';
import Back from "../../component/common/Back";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import HelpIcon from "@mui/icons-material/Help";
// 테마 정의
const theme = createTheme({
    palette: {
        primary: {
            main: "#cfe8fc",
        },
    },
});

const ListFollowingForm = () => {
    const [followingList, setFollowingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFollowingList = async () => {
            try {
                const response = await authInstance.get('/member/relationship/following/list');
                console.log('Response:', response);
                console.log('Data:', response.data);
                setFollowingList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchFollowingList();

    }, []);

    const handleNavigateToFollowingDetail = (targetMemberId) => {
        // 차단 상세 페이지로 이동
        navigate(`/member/relationship/following/get/${targetMemberId}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <List sx={{ width: '100%' }}>
                        {followingList.length > 0 ? (
                            followingList.map((following) => (
                                <ListItem
                                    key={following.id}
                                    sx={{ justifyContent: 'flex-start' }}
                                >
                                    <SentimentSatisfiedAltOutlinedIcon />
                                    <ListItemText
                                        primary={following.targetMember.nickname}
                                        sx={{ marginLeft: '15px' }}
                                    />
                                    <IconButton
                                        onClick={() => handleNavigateToFollowingDetail(following.targetMember.id)}
                                        aria-label="comment"
                                    >
                                        <ArticleOutlinedIcon />
                                    </IconButton>
                                </ListItem>
                            ))
                        ) : (
                            <>
                                <HelpIcon sx={{ fontSize: 64, marginBottom: 2, marginLeft: 19, marginTop:30 }} />
                                <Typography variant="h5" sx={{ marginLeft: 5, marginBottom: 30 }}>
                                    팔로우한 회원이 없습니다!
                                </Typography>
                            </>
                        )}
                        <Back url = "/member/profile" />
                    </List>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ListFollowingForm;
