export const enum InteractionType {
  SlashCommand,
  Button,
  Select,
  ContextMenu,
  Modal,
  AutoComplete
}

export const enum ReportType {
  Webhook,
  Text
}

export enum ProcessStatusString {
  online = '🟢 온라인',
  stopping = '📉 프로세스 정지 중',
  stopped = '🔴 정지됨',
  launching = '🚀 프로세스 시작 중',
  errored = '🛑 오류남'
}
