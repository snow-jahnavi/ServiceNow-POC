// import { GlideRecord } from '@servicenow/glide'

declare const sn_lxp: any

const ACHIEVEMENT_FIELDS = 'sys_id,name,description,user,achievement_type,badge,points,earned_on,active,sys_created_on,sys_updated_on'

export function resolveAchievements(env: any) {
    const args = env.getArguments()
    const limit = args.limit || 20
    const userId = args.user_id
    const achievementType = args.achievement_type
    const active = args.active

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()

    const queryParts: string[] = []
    if (userId) {
        queryParts.push('user=' + userId)
    }
    if (achievementType) {
        queryParts.push('achievement_type=' + achievementType)
    }
    if (active !== undefined && active !== null) {
        queryParts.push('active=' + active)
    }
    const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'

    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS, limit)

    const records: any[] = []
    for (let i = 0; i < results.length; i++) {
        const rec = results[i]
        records.push({
            sys_id: rec.sys_id || '',
            name: rec.name || '',
            description: rec.description || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            achievement_type: rec.achievement_type || '',
            dv_achievement_type: rec.__dv_achievement_type || '',
            badge: rec.badge || '',
            dv_badge: rec.__dv_badge || '',
            points: parseInt(rec.points || '0', 10),
            earned_on: rec.earned_on || '',
            active: rec.active === 'true' || rec.active === true,
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
        })
    }

    return records

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_achievement')
    //
    // if (userId) {
    //     gr.addQuery('user', userId)
    // }
    // if (achievementType) {
    //     gr.addQuery('achievement_type', achievementType)
    // }
    // if (active !== undefined && active !== null) {
    //     gr.addQuery('active', active)
    // }
    //
    // gr.setLimit(limit)
    // gr.orderByDesc('sys_created_on')
    // gr.query()
    //
    // const records: any[] = []
    // while (gr.next()) {
    //     records.push({
    //         sys_id: gr.getUniqueValue(),
    //         name: gr.getValue('name') || '',
    //         description: gr.getValue('description') || '',
    //         user: gr.getValue('user') || '',
    //         achievement_type: gr.getValue('achievement_type') || '',
    //         badge: gr.getValue('badge') || '',
    //         points: parseInt(gr.getValue('points') || '0', 10),
    //         earned_on: gr.getValue('earned_on') || '',
    //         active: gr.getValue('active') === 'true',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //     })
    // }
    //
    // return records
}

export function resolveAchievement(env: any) {
    const args = env.getArguments()
    const sysId = args.sys_id

    if (!sysId) {
        return null
    }

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()
    const encodedQuery = 'sys_id=' + sysId
    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS, 1)

    if (results && results.length > 0) {
        const rec = results[0]
        return {
            sys_id: rec.sys_id || '',
            name: rec.name || '',
            description: rec.description || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            achievement_type: rec.achievement_type || '',
            dv_achievement_type: rec.__dv_achievement_type || '',
            badge: rec.badge || '',
            dv_badge: rec.__dv_badge || '',
            points: parseInt(rec.points || '0', 10),
            earned_on: rec.earned_on || '',
            active: rec.active === 'true' || rec.active === true,
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
        }
    }

    return null

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_achievement')
    // if (gr.get(sysId)) {
    //     return {
    //         sys_id: gr.getUniqueValue(),
    //         name: gr.getValue('name') || '',
    //         description: gr.getValue('description') || '',
    //         user: gr.getValue('user') || '',
    //         achievement_type: gr.getValue('achievement_type') || '',
    //         badge: gr.getValue('badge') || '',
    //         points: parseInt(gr.getValue('points') || '0', 10),
    //         earned_on: gr.getValue('earned_on') || '',
    //         active: gr.getValue('active') === 'true',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //     }
    // }
    //
    // return null
}
