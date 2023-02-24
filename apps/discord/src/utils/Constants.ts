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

export interface ProcessList {
  name: string
  pm2_env: {
    status: ProcessStatus
    pm_uptime: number
    restart_time: number
    unstable_restarts: number
    created_at: number
    pm_id: number
    pid: number
    restarts: number
    interpreter: string
    args: string[]
  }
  pm_id: number
}

export type ProcessStatus =
  | 'online'
  | 'stopping'
  | 'stopped'
  | 'launching'
  | 'errored'
