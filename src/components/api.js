import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style.js';

function Api() {
    const [loading, setLoading] = useState(false);
    const [infos, setInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setInfo(null);
                setError(null);
                console.log('info와 error값 false');
                setLoading(true);
                console.log('loading 값 true');
                // 초깃값 설정
                const getInfo = await axios.get('https://www.scorebat.com/video-api/v3/'); // api 호출
                setInfo(getInfo.data); // data를 받아옴
                console.log('api 받아옴');
            } catch (e) {
                setError(e);
            }
            setLoading(false)
        };
        fetchInfo();
    }, []);

    if (loading) return <S.Loading><div>로딩중...</div></S.Loading>
    if (error) return <div>에러가 발생하였습니다.</div>
    if (!infos) return null;

    return (
        <>
            <S.ApiKit>
                <ul>
                    {infos.response.map(infos => (
                        <li key={infos.title} className="">
                            <p>{infos.title} ({infos.competition})</p>  <br />
                            <img src={infos.thumbnail} alt="썸네일" className="image" />
                        </li>
                    ))}
                </ul>
            </S.ApiKit>
        </>
    );
}

export default Api;

// https://www.scorebat.com/video-api/v3/ : api 주소 2