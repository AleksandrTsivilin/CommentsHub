import { FC, memo, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { BASE_URL } from '../../../api';
import { Loader } from '../Loader';
import { Button } from '../Button';
import './CaptchaImage.css';

interface Props {
    reload?: {}
}

export const CaptchaImage: FC<Props> = memo(({reload}) =>{
    const [, forceUpdate] = useState({});
    const [isError, setIsError] = useState<boolean>(true);
    return (
        <ReactSVG 
            src={`${BASE_URL}/captcha`}
            beforeInjection={(svg) => {
                svg.classList.add('Captcha__svg');
            }} 
            loading = {() => <div> <Loader /> </div>}
            fallback={() => (
                <>
                    <div>
                        <Button type='button' text='↻' position='end' onClick={() => forceUpdate({})} />
                    </div>
                    {isError && <p className='error-text'>invalid code try again</p>}
                </>
            )}
            useRequestCache={false}
            onError={() => setIsError(true)}
            httpRequestWithCredentials={true}

        />
    )
})