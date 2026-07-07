import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingContainer } from "@/components/ui";
import { Input } from "../ui/Input";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";

/**
 * Voice Flow：VPS 聽寫後端設定。
 * 設定 endpoint 後，post-process 熱鍵改走後端 /polish（潤飾 prompt 與詞庫共用於後端）；
 * privacy mode 開啟時跳過雲端潤飾，直接注入原始逐字稿。
 */
export const VoiceFlowSettings: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const endpoint = getSetting("voiceflow_endpoint") || "";
  const token = getSetting("voiceflow_token") || "";
  const privacyMode = getSetting("privacy_mode") || false;

  const [draftEndpoint, setDraftEndpoint] = useState(endpoint);
  const [draftToken, setDraftToken] = useState(token);

  useEffect(() => setDraftEndpoint(endpoint), [endpoint]);
  useEffect(() => setDraftToken(token), [token]);

  return (
    <>
      <SettingContainer
        title={t("settings.voiceflow.endpoint.title")}
        description={t("settings.voiceflow.endpoint.description")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped={true}
      >
        <Input
          type="text"
          value={draftEndpoint}
          onChange={(e) => setDraftEndpoint(e.target.value)}
          onBlur={() =>
            updateSetting("voiceflow_endpoint", draftEndpoint.trim())
          }
          placeholder={t("settings.voiceflow.endpoint.placeholder")}
          disabled={isUpdating("voiceflow_endpoint")}
          variant="compact"
          className="min-w-[320px]"
        />
      </SettingContainer>

      <SettingContainer
        title={t("settings.voiceflow.token.title")}
        description={t("settings.voiceflow.token.description")}
        descriptionMode="tooltip"
        layout="horizontal"
        grouped={true}
      >
        <Input
          type="password"
          value={draftToken}
          onChange={(e) => setDraftToken(e.target.value)}
          onBlur={() => updateSetting("voiceflow_token", draftToken.trim())}
          placeholder={t("settings.voiceflow.token.placeholder")}
          disabled={isUpdating("voiceflow_token")}
          variant="compact"
          className="min-w-[320px]"
          autoComplete="off"
        />
      </SettingContainer>

      <ToggleSwitch
        checked={privacyMode}
        onChange={(enabled) => updateSetting("privacy_mode", enabled)}
        isUpdating={isUpdating("privacy_mode")}
        label={t("settings.voiceflow.privacyMode.label")}
        description={t("settings.voiceflow.privacyMode.description")}
        descriptionMode="tooltip"
        grouped={true}
      />
    </>
  );
});

VoiceFlowSettings.displayName = "VoiceFlowSettings";
