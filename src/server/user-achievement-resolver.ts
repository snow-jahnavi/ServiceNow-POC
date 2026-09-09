// import { GlideRecord } from '@servicenow/glide'

declare const sn_lxp: any

const USER_ACHIEVEMENT_FIELDS = 'sys_id,user,content,achievement,earned_on,number,sys_created_on,sys_updated_on'
const COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id'
const ACHIEVEMENT_FIELDS = 'sys_id,name,description,achievement_type,badge,points,active,sys_created_on,sys_updated_on'

export function resolveUserAchievements(env: any) {
    const args = env.getArguments()
    const limit = args.limit || 20
    const userId = args.user_id

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()

    const queryParts: string[] = []
    if (userId) {
        queryParts.push('user=' + userId)
    }
    const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'

    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_user_achievement', encodedQuery, USER_ACHIEVEMENT_FIELDS, limit)

    const records: any[] = []
    for (let i = 0; i < results.length; i++) {
        const rec = results[i]
        records.push({
            sys_id: rec.sys_id || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            content: rec.content || '',
            dv_content: rec.__dv_content || '',
            achievement: rec.achievement || '',
            dv_achievement: rec.__dv_achievement || '',
            earned_on: rec.earned_on || '',
            number: rec.number || '',
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
        })
    }

    return records

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_user_achievement')
    //
    // if (userId) {
    //     gr.addQuery('user', userId)
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
    //         user: gr.getDisplayValue('user') || '',
    //         content: gr.getValue('content') || '',
    //         achievement: gr.getValue('achievement') || '',
    //         earned_on: gr.getValue('earned_on') || '',
    //         number: gr.getValue('number') || '',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //     })
    // }
    //
    // return records
}

export function resolveUserAchievement(env: any) {
    const args = env.getArguments()
    const sysId = args.sys_id

    if (!sysId) {
        return null
    }

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()
    const encodedQuery = 'sys_id=' + sysId
    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_user_achievement', encodedQuery, USER_ACHIEVEMENT_FIELDS, 1)

    if (results && results.length > 0) {
        const rec = results[0]
        return {
            sys_id: rec.sys_id || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            content: rec.content || '',
            dv_content: rec.__dv_content || '',
            achievement: rec.achievement || '',
            dv_achievement: rec.__dv_achievement || '',
            earned_on: rec.earned_on || '',
            number: rec.number || '',
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
        }
    }

    return null

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_user_achievement')
    // if (gr.get(sysId)) {
    //     return {
    //         sys_id: gr.getUniqueValue(),
    //         user: gr.getDisplayValue('user') || '',
    //         content: gr.getValue('content') || '',
    //         achievement: gr.getValue('achievement') || '',
    //         earned_on: gr.getValue('earned_on') || '',
    //         number: gr.getValue('number') || '',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //     }
    // }
    //
    // return null
}

export function resolveUserAchievementContent(env: any) {
    const source = env.getSource()
    const contentSysId = source.content

    if (!contentSysId) {
        return null
    }

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()
    const encodedQuery = 'sys_id=' + contentSysId
    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS, 1)

    if (results && results.length > 0) {
        const rec = results[0]
        return {
            sys_id: rec.sys_id || '',
            name: rec.name || '',
            short_description: rec.short_description || '',
            description: rec.description || '',
            state: rec.state || '',
            dv_state: rec.__dv_state || '',
            type: rec.type || '',
            dv_type: rec.__dv_type || '',
            language: rec.language || '',
            dv_language: rec.__dv_language || '',
            rating: parseFloat(rec.rating || '0'),
            duration: rec.duration || '',
            enrollment_count: parseInt(rec.enrollment_count || '0', 10),
            view_count: parseInt(rec.view_count || '0', 10),
            active: rec.active === 'true' || rec.active === true,
            published: rec.published || '',
            dv_published: rec.__dv_published || '',
            number: rec.number || '',
            content_id: rec.content_id || '',
        }
    }

    return null

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_content_base')
    // if (gr.get(contentSysId)) {
    //     return {
    //         sys_id: gr.getUniqueValue(),
    //         name: gr.getValue('name') || '',
    //         short_description: gr.getValue('short_description') || '',
    //         description: gr.getValue('description') || '',
    //         state: gr.getValue('state') || '',
    //         type: gr.getValue('type') || '',
    //         language: gr.getValue('language') || '',
    //         rating: parseFloat(gr.getValue('rating') || '0'),
    //         duration: gr.getValue('duration') || '',
    //         enrollment_count: parseInt(gr.getValue('enrollment_count') || '0', 10),
    //         view_count: parseInt(gr.getValue('view_count') || '0', 10),
    //         active: gr.getValue('active') === 'true',
    //         published: gr.getValue('published') || '',
    //         number: gr.getValue('number') || '',
    //         content_id: gr.getValue('content_id') || '',
    //     }
    // }
    //
    // return null
}

export function resolveUserAchievementAchievement(env: any) {
    const source = env.getSource()
    const achievementSysId = source.achievement

    if (!achievementSysId) {
        return null
    }

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()
    const encodedQuery = 'sys_id=' + achievementSysId
    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS, 1)

    if (results && results.length > 0) {
        const rec = results[0]
        return {
            sys_id: rec.sys_id || '',
            name: rec.name || '',
            description: rec.description || '',
            achievement_type: rec.achievement_type || '',
            dv_achievement_type: rec.__dv_achievement_type || '',
            badge: rec.badge || '',
            dv_badge: rec.__dv_badge || '',
            points: parseInt(rec.points || '0', 10),
            active: rec.active === 'true' || rec.active === true,
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
        }
    }

    return null

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_achievement')
    // if (gr.get(achievementSysId)) {
    //     return {
    //         sys_id: gr.getUniqueValue(),
    //         name: gr.getValue('name') || '',
    //         description: gr.getValue('description') || '',
    //         achievement_type: gr.getValue('achievement_type') || '',
    //         badge: gr.getValue('badge') || '',
    //         points: parseInt(gr.getValue('points') || '0', 10),
    //         active: gr.getValue('active') === 'true',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //     }
    // }
    //
    // return null
}
