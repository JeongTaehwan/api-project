import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러가 발생하였습니다.</div>
    if (!infos) return null;

    return (
        <ul>
            {infos.map(infos => (
                <li key={infos.title}>
                    {infos.title}
                </li>
            ))}
        </ul>
    );
}

export default Api;
// https://geek-jokes.sameerkumar.website/api?format=json: api 주소
// https://www.scorebat.com/video-api/v3/ : api 주소 2