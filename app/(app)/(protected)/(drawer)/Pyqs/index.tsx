import { BackHandler } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from '~/components/Container';
import WebView from 'react-native-webview';

export default function PYQs() {
    const webViewRef = useRef<any>();
    const [currentUrl, setCurrentUrl] = useState('');

    const eduzoneUrl = 'https://eduzone-nitd.pages.dev/';

    const injectedJavaScript = `
    (function() {
      // Prevent horizontal scrolling
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.overflowX = 'hidden';
      
      // Ensure the width is constrained
      document.body.style.width = '100%';
      document.documentElement.style.width = '100%';

      // Hide header if it exists
      const header = document.querySelector('.z-10');
      if (header) {
        header.style.display = 'none';
      }
      
      // Ensure all child elements also don't overflow
      Array.from(document.querySelectorAll('*')).forEach((el) => {
        el.style.overflowX = 'hidden';
      });

      true;
    })();
  `;

    const handleBackButtonPress = () => {
        if (currentUrl === eduzoneUrl) {
            return false;
        } else {
            if (webViewRef.current) {
                webViewRef.current.goBack();
            }
            return true;
        }
    };

    useEffect(() => {
        BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonPress
        );
        return () =>
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonPress
            );
    }, [currentUrl]);

    return (
        <Container>
            <WebView
                source={{ uri: eduzoneUrl }}
                ref={webViewRef}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                className="absolute flex-1"
                injectedJavaScript={injectedJavaScript}
                bounces={false}
                onNavigationStateChange={(navState) => {
                    setCurrentUrl(navState.url);
                }}
            />
        </Container>
    );
}
