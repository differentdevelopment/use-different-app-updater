import React, { useState, useEffect } from "react";
import Axios from "axios";
import semver from "semver";
import { clearCache } from "clear-cache";

const version = localStorage.getItem("APP_VER") ?? "0.0.1";

const useDifferentAppUpdater = (appName: string) => {
    const [isUpdateReady, setIsUpdateReady] = useState<boolean>(false);
    const [tempVersion, setTempVersion] = useState<string>(version ?? "0.0.1");

    useEffect(() => {
        if (version) {
            Axios.get("https://raw.githubusercontent.com/differentdevelopment/Ionic-App-Versions/main/versions.json")
                .then((response: any) => {
                    if (
                        response !== undefined && 
                        response.data !== undefined && 
                        response.data[appName] !== undefined && 
                        response.data[appName].version !== undefined
                    ) {
                        if (semver.valid(response.data[appName].version) && semver.gt(response.data[appName].version, version)) {
                            if (response.data[appName].forceUpdate) {
                                setTempVersion(response.data[appName].version);
                                setIsUpdateReady(true);
                            } else {
                                setTempVersion(response.data[appName].version);
                                setIsUpdateReady(true);
                            }
                        }
                    }
                })
                .catch((response: any) => {
                    console.error(response);
                });
        }
    }, [version]);

    function onUpdate(ver?: string) {
        localStorage.setItem("APP_VER", ver ? ver : tempVersion);
        clearCache(true);
    }

    return [
        isUpdateReady,
        onUpdate,
    ] as const;
}

export default useDifferentAppUpdater;

/*
* // USAGE
*
* const [ isUpdateReady, onUpdate ] = useDifferentAppUpdater("PROJECT_NAME_HERE");
*
* `isUpdateReady` will tell you when you need to show a popup / alert.
* Call `onUpdate` when you want to update your app's version.
*/
