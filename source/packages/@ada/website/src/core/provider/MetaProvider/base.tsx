/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { AmplifyProvider } from '../AmplifyProvider';
import { ApiProvider } from '../ApiProvider';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { ENV_TEST } from '$config';
import { I18nProvider } from '$strings'
import { IndexingProvider } from '$core/provider/IndexingProvider';
// eslint-disable-next-line no-restricted-imports
import {NorthStarThemeProvider, ThemeOptions} from 'aws-northstar';
import { UserProvider } from '../UserProvider';
import {getTheme} from "aws-northstar/themes/default";
import React, { PropsWithChildren } from 'react';
import {createMuiTheme} from "@material-ui/core";

const Router = (ENV_TEST ? MemoryRouter : BrowserRouter) as new (...args: any[]) => any;

// enable overwriting provider for testing
export interface BaseMetaProviderProps extends PropsWithChildren<{}> {
  api?: React.ComponentType;
  northstar?: React.ComponentType;
  router?: React.ComponentType;
  amplify?: React.ComponentType;
  user?: React.ComponentType;
  indexing?: React.ComponentType;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const BaseMetaProvider = ({
  children,
  api,
  northstar,
  router,
  amplify,
  user,
  indexing,
}: BaseMetaProviderProps) => {
  // Helpers to enable disabling providers for testing purposes
  const RouterComponent = router || Router;
  const ApiProviderComponent = api || ApiProvider;
  const NorthStarThemeProviderComponent = northstar || NorthStarThemeProvider;
  const AmplifyProviderComponent = amplify || AmplifyProvider;
  const UserProviderComponent = user || UserProvider;
  const IndexingProviderComponent = indexing || IndexingProvider;

  const theme: ThemeOptions = createMuiTheme({
    ...getTheme(),
    typography: {
      ...getTheme().typography,
      fontFamily: 'Montserrat',
    },
    overrides: {
      ...getTheme().overrides,
      MuiButton: {
        ...getTheme().overrides?.MuiButton,
        containedPrimary: {
          ...getTheme().overrides?.MuiButton?.containedPrimary,
          "&:hover": {
            backgroundColor: "#49BCD7",
            borderColor: "#49BCD7",
          },
          backgroundColor: "#49BCD7",
          borderColor: "#49BCD7",
        }
      }
    },
    palette: {
      ...getTheme().palette,
      primary: {
        ...getTheme().palette?.primary,
        main: '#2F3440',
      },
      secondary: {
        ...getTheme().palette?.secondary,
        main: "#49BCD7",
        light: '#69d7f0',
        dark: "#49BCD7",
      },
      text: {
        ...getTheme().palette?.text,
      }
    }
  })

  console.log('getTheme().typography',getTheme().typography)

  return (
    <I18nProvider locale="en">
      <NorthStarThemeProviderComponent theme={theme}>
        <AmplifyProviderComponent>
          <RouterComponent>
            <ApiProviderComponent>
              <UserProviderComponent>
                <IndexingProviderComponent>{children}</IndexingProviderComponent>
              </UserProviderComponent>
            </ApiProviderComponent>
          </RouterComponent>
        </AmplifyProviderComponent>
      </NorthStarThemeProviderComponent>
    </I18nProvider>
  );
};
