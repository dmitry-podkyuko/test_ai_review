/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-boolean-value */
import dynamic from 'next/dynamic';
import React, {
  memo,
  useEffect,
  useState,
  Suspense,
} from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import CustomColorPicker from '../../components/CustomColorPicker';
import { IChangeRandomAppearancePayload, IStore } from '../../types/storeInterfaces';
import { changeRandomAppearance, colorSync } from '../../store/actions/appearanceAction';
import svgStorage from '../../constants/svgStorage';
import Footer from '../../components/Footer/Footer';
import Hero from '../../components/Hero/Hero';
import Header from '../../components/Header/Header';
import Hair from '../../public/design/desktop/constructor/Heir.svg';
import Background from '../../public/design/desktop/constructor/Background.svg';
import Body from '../../public/design/desktop/constructor/Body.svg';
import Communicator from '../../public/design/desktop/constructor/Communicator.svg';
import Eyes from '../../public/design/desktop/constructor/Eyes.svg';
import Head from '../../public/design/desktop/constructor/Head.svg';
import Jewel from '../../public/design/desktop/constructor/Jewel.svg';
import RandomIcon from '../../public/design/desktop/constructor/header_constructor/button_reset_icon.svg';
import styles from '../../styles/Constructor.module.css';
import Loading from '../../components/Loading/Loading';
import useWindowSize from '../../hooks/useWindowSize';
import getWindow from '../../hooks/getWindowObject';
import { DEFAULT_VALUES, STORAGE_KEYS } from '../../constants';
import isMobile from '../../utilities/is-mobile';

const ModalPreviewAvatar = dynamic(() => import('../../components/ModalPreviewAvatar/ModalPreviewAvatar'), {
  suspense: true,
});
const ModalResetAppearance = dynamic(() => import('../../components/ModalResetAppearance/ModalResetAppearance'), {
  suspense: true,
});
const ModalDownloadOptions = dynamic(() => import('../../components/ModalDownloadOptions/ModalDownloadOptions'), {
  suspense: true,
});
const ModalSweeps = dynamic(() => import('../../components/ModalSweeps/ModalSweeps'), {
  suspense: true,
});
const ModalDownload = dynamic(() => import('../../components/ModalDownload/ModalDownload'), {
  suspense: true,
});
const ModalChangeAvatar = dynamic(() => import('../../components/ModalChangeAvatar/ModalChangeAvatar'), {
  suspense: true,
});
const ModalChangeAvatarHorizontal = dynamic(() => import('../../components/ModalChangeAvatarHorizontal/ModalChangeAvatarHorizontal'), {
  suspense: true,
});
const ModalChangeAvatarMobile = dynamic(() => import('../../components/ModalChangeAvatarMobile/ModalChangeAvatarMobile'), {
  suspense: true,
});
const ChooseColorBodyModal = dynamic(() => import('../../components/ChooseColorBodyModal/ChooseColorBodyModal'), {
  suspense: true,
});

const btnArray = [{
  name: 'background',
  icon: Background,
}, {
  name: 'body',
  icon: Body,
}, {
  name: 'head',
  icon: Head,
}, {
  name: 'hair',
  icon: Hair,
}, {
  name: 'face',
  icon: Eyes,
}, {
  name: 'prop',
  icon: Communicator,
}, {
  name: 'flair',
  icon: Jewel,
}];

function getRandomNumber(max: number, min: number = 0): number {
  const ceilMin = Math.ceil(min);
  const ceilMax = Math.floor(max);
  return Math.floor(Math.random() * (ceilMax - ceilMin)) + ceilMin;
}

function getRandomColor(): string {
  let randomColor = '#';
  for (let i = 0; i < 3; i += 1) {
    randomColor += Math.floor(Math.random() * (255 - 0)).toString(16);
  }
  if (randomColor.length === 5 || randomColor.length === 6) {
    return randomColor.slice(0, 4);
  }
  return randomColor;
}

function Constructor(): React.ReactElement {
  const { SWEEPS_MODAL } = process.env;
  const { NEWSLETTER_MODAL } = process.env;
  const navigation = useRouter();
  const dispatch = useAppDispatch();
  const [IPGeolocation, setIPGeolocation] = useState<any>('');
  const [currentCategory, setCurrentCategory] = useState<string>('body');
  const [openModalResetAvatar, setOpenModalResetAvatar] = useState<boolean>(false);
  const [openModalPreviewAvatar, setOpenModalPreviewAvatar] = useState<boolean>(false);
  const [openModalDownloadOptions, setOpenModalDownloadOptions] = useState<boolean>(false);
  const [openModalDownload, setOpenModalDownload] = useState<boolean>(false);
  const [openModalSweeps, setOpenModalSweeps] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { appearanceReducer: { avatar } } = useAppSelector((state: IStore) => state);
  const openColorPicker = currentCategory === 'hair' || currentCategory === 'head';

  useWindowSize();

  const changeCutegory = (name: string) => {
    dispatch(colorSync({ cutegory: currentCategory }));
    setCurrentCategory(name);
  };

  useEffect(
    (): void => {
      const termsAgreed = localStorage.getItem(STORAGE_KEYS.termsAgreed);
      if (!termsAgreed) {
        navigation.replace('/');
      }
      setIPGeolocation(localStorage.getItem(STORAGE_KEYS.IPGeolocation));
    },
    [],
  );

  const hasWindow = getWindow();
  useEffect(
    (): void => {
      if (hasWindow) {
        try {
          const windowAny = window as any;
          (windowAny)?.om?.getHbParams();
          if (windowAny && windowAny.om) {
            const utagData = {
              brandPlatformId: !isMobile()
                ? DEFAULT_VALUES.analytics.brandPlatformId.desktop
                : DEFAULT_VALUES.analytics.brandPlatformId.mobile,
              pageViewGuid: v4(),
              siteEdition: localStorage.getItem(STORAGE_KEYS.IPGeolocation) === 'US'
                ? DEFAULT_VALUES.analytics.siteEdition.domestic
                : DEFAULT_VALUES.analytics.siteEdition.international,
              siteSection: DEFAULT_VALUES.analytics.siteSection.constructor,
              pageType: DEFAULT_VALUES.analytics.pageType,
              pageName: DEFAULT_VALUES.analytics.pageName(document.location.pathname),
              pageUrl: `${window.location.href}`,
            };
            windowAny?.om?.trackState(utagData);
          }
        } catch {
          console.log('Analytics not sent');
        }
      }
    },
    [hasWindow],
  );

  useEffect(() => {
    if (global.outerWidth) {
      setWidth(global.outerWidth);
      setLoading(false);
    }
  }, [global.outerWidth]);

  const handleOpenStream = () => {
    window.open('https://www.paramountplus.com/shows/star-trek-lower-decks');
  };

  function getArrayRandomNumbers(): IChangeRandomAppearancePayload {
    const arr: any = [];
    Object.keys(avatar).forEach((item, idx) => {
      arr.push({
        imageNumber: getRandomNumber(svgStorage[item].length),
        fill: getRandomColor(),
      });
      if (item === 'body') arr[idx - 1].imageNumber = Math.floor(arr[idx].imageNumber / 3);
      if (item === 'head') arr[idx - 2].fill = arr[idx].fill;
      if (item === 'face') arr[idx].fill = arr[idx - 1].fill;
    });
    return arr;
  }

  const selectAppearance = (): void => {
    getRandomColor();
    dispatch(changeRandomAppearance(getArrayRandomNumbers()));
  };

  if (loading) return (<Loading />);

  return (
    <>
      <Header />
      <div
        className={cn(
          styles.constructor_wrapper,
          (IPGeolocation !== 'US' && styles.constructor_wrapper_not_par),
        )}
      >
        <div className={styles.header_top_constructor}>
          {IPGeolocation === 'US'
            && (
              <button type="button" onClick={handleOpenStream} className={styles.stream_button}>
                <p>Stream Star Trek: Lower Decks on </p>
                <div className={styles.header_top_constructor__logo} />
              </button>
            )}
          {IPGeolocation === 'US'
            && (
              <button type="button" onClick={handleOpenStream} className={styles.stream_button_mobile} />
            )}
          {IPGeolocation === 'US' ? (
            <div className={styles.logo_lower_decks} />
          ) : <div className={styles.logo_lower_decks_not_par} />}
        </div>
        <div className={styles.header_lower_constructor}>
          <div className={styles.header_buttons}>
            <button
              className={styles.button_start}
              type="button"
              disabled={true}
            >
              START
            </button>
            <button
              className={styles.button_reset}
              type="button"
              onClick={() => setOpenModalResetAvatar(true)}
            >
              RESET
            </button>
            <div
              className={styles.button_random}
            />
            <span className={styles.header_lower_constructor_outline} />
          </div>
        </div>

        <div className={styles.constructor_body}>
          <div className={styles.setting_button}>
            <button
              className={cn(
                styles.constructor__button_change_group,
                styles.constructor__button_change_group_random_button,
              )}
              onClick={selectAppearance}
              type="button"
              key={-1}
            >
              <RandomIcon className={styles.constructor__button_icon} />
            </button>
            {btnArray.map((item) => (
              <button
                className={cn(
                  styles.constructor__button_change_group,
                  (currentCategory === item.name && styles.active),
                )}
                onClick={() => changeCutegory(item.name)}
                type="button"
                key={item.name}
              >
                <item.icon className={styles.constructor__button_icon} />
              </button>
            ))}
          </div>
          <div className={styles.wrapper_avatar}>
            <Hero customClassName={styles.avatar} />
            {currentCategory === 'body' && (
              <Suspense fallback={<Loading />}>
                <ChooseColorBodyModal />
              </Suspense>
            )}
          </div>
          <div className={styles.change_avatar}>
            {width > 900 && (
              <Suspense fallback={<Loading />}>
                <ModalChangeAvatar currentCategory={currentCategory} />
              </Suspense>
            )}
            {width > 640 && width < 901 && (
              <Suspense fallback={<Loading />}>
                <ModalChangeAvatarMobile currentCategory={currentCategory} />
              </Suspense>
            )}
            {openColorPicker ? (
              <div className={styles.modal__footer}>
                <CustomColorPicker
                  currentCategory={currentCategory}
                />
              </div>
            )
              : (
                <div className={styles.scan} />
              )}
            <div className={styles.empty_block} />
          </div>
        </div>
        <div className={styles.change_avatar_horizontal}>
          <div className={styles.outline_left} />
          {width < 641 && (
            <Suspense fallback={<Loading />}>
              <ModalChangeAvatarHorizontal currentCategory={currentCategory} />
            </Suspense>
          )}
          <div className={styles.scan_mobile} />
        </div>
        <div className={styles.footer_constructor}>
          <div className={styles.footer_outline_left} />
          <div className={styles.footer_right}>
            <button
              className={cn(
                styles.footer_constructor_button,
                styles.footer_constructor_button__preview,
              )}
              type="button"
              onClick={() => setOpenModalPreviewAvatar(true)}
            >
              PREVIEW
            </button>
            <button
              className={cn(
                styles.footer_constructor_button,
                styles.footer_constructor_button__finish,
              )}
              type="button"
              onClick={
                (): void => {
                  if (IPGeolocation === 'US' && SWEEPS_MODAL === 'enabled') {
                    setOpenModalDownloadOptions(true);
                  } else if (NEWSLETTER_MODAL === 'enabled') {
                    setOpenModalDownloadOptions(true);
                  } else {
                    setOpenModalDownload(true);
                  }
                }
              }
            >
              FINISH
            </button>
          </div>
        </div>
      </div>
      {openModalResetAvatar && (
        <Suspense fallback={<Loading />}>
          <ModalResetAppearance handleModalClose={() => setOpenModalResetAvatar(false)} />
        </Suspense>
      )}
      {openModalPreviewAvatar && (
      <Suspense fallback={<Loading />}>
        <ModalPreviewAvatar
          handleModalClose={() => setOpenModalPreviewAvatar(false)}
          handleDownloadOptionsOpen={() => setOpenModalDownloadOptions(true)}
          handleDownloadOpen={() => setOpenModalDownload(true)}
          IPGeolocation={IPGeolocation}
        />
      </Suspense>

      )}
      {openModalDownloadOptions && (
        <Suspense fallback={<Loading />}>
          <ModalDownloadOptions
            handleModalClose={() => setOpenModalDownloadOptions(false)}
            handleSweepsOpen={() => setOpenModalSweeps(true)}
            handleDownloadOpen={() => setOpenModalDownload(true)}
          />
        </Suspense>
      )}
      {openModalDownload && (
        <Suspense fallback={<Loading />}>
          <ModalDownload
            handleModalClose={() => setOpenModalDownload(false)}
          />
        </Suspense>
      )}
      {openModalSweeps && (
        <Suspense fallback={<Loading />}>
          <ModalSweeps
            handleModalClose={() => setOpenModalSweeps(false)}
            handleDownloadOpen={() => setOpenModalDownload(true)}
          />
        </Suspense>
      )}
      <Footer IPGeolocation={IPGeolocation} />
    </>
  );
}

export default memo(Constructor);
