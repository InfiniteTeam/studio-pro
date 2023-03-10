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
  online = 'π’ μ¨λΌμΈ',
  stopping = 'π νλ‘μΈμ€ μ μ§ μ€',
  stopped = 'π΄ μ μ§λ¨',
  launching = 'π νλ‘μΈμ€ μμ μ€',
  errored = 'π μ€λ₯λ¨'
}
