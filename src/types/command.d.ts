interface Command {
  name: string;
  triggers: string[];
  description?: string;
  exampleUsage?: string;
  action: any;

  requiredPermissions?: Discord.PermissionString[];
  requiresVoiceChannel?: boolean;
}
