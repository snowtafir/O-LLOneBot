import { BaseAction } from '../BaseAction'
import { ActionName } from '../types'

interface Payload {
  group_id: number
  user_id: number
  duration: number
}

export default class SetGroupBan extends BaseAction<Payload, null> {
  actionName = ActionName.SetGroupBan

  protected async _handle(payload: Payload): Promise<null> {
    const member = await this.ctx.ntGroupApi.getGroupMember(payload.group_id, payload.user_id)
    if (!member) {
      throw `群成员${payload.user_id}不存在`
    }
    await this.ctx.ntGroupApi.banMember(payload.group_id.toString(), [
      { uid: member.uid, timeStamp: parseInt(payload.duration.toString()) },
    ])
    return null
  }
}
