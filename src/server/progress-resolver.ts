// import { GlideRecord } from '@servicenow/glide'

declare const sn_lxp: any

const PROGRESS_FIELDS = 'sys_id,user,content,status,percentage,started_at,completed_at,last_accessed,sys_created_on,sys_updated_on,number,percent_complete'
const COURSE_FIELDS = 'sys_id,name,short_description,description,state,type,language,rating,duration,enrollment_count,view_count,active,published,number,content_id'

export function resolveProgressRecords(env: any) {
    const args = env.getArguments()
    const limit = args.limit || 20
    const userId = args.user_id
    const contentId = args.content_id
    const status = args.status

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()

    const queryParts: string[] = []
    if (userId) {
        queryParts.push('user=' + userId)
    }
    if (contentId) {
        queryParts.push('content=' + contentId)
    }
    if (status) {
        queryParts.push('status=' + status)
    }
    const encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on'

    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS, limit)

    const records: any[] = []
    for (let i = 0; i < results.length; i++) {
        const rec = results[i]
        records.push({
            sys_id: rec.sys_id || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            content: rec.content || '',
            dv_content: rec.__dv_content || '',
            status: rec.status || '',
            dv_status: rec.__dv_status || '',
            percentage: parseInt(rec.percentage || '0', 10),
            started_at: rec.started_at || '',
            completed_at: rec.completed_at || '',
            last_accessed: rec.last_accessed || '',
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
            number: rec.number || '',
            percent_complete: rec.percent_complete || '',
        })
    }

    return records

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_progress')
    //
    // if (userId) {
    //     gr.addQuery('user', userId)
    // }
    // if (contentId) {
    //     gr.addQuery('content', contentId)
    // }
    // if (status) {
    //     gr.addQuery('status', status)
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
    //         status: gr.getValue('status') || '',
    //         percentage: parseInt(gr.getValue('percentage') || '0', 10),
    //         started_at: gr.getValue('started_at') || '',
    //         completed_at: gr.getValue('completed_at') || '',
    //         last_accessed: gr.getValue('last_accessed') || '',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //         number: gr.getValue('number') || '',
    //         percent_complete: gr.getValue('percent_complete') || '',
    //     })
    // }
    //
    // return records
}

export function resolveProgressRecord(env: any) {
    const args = env.getArguments()
    const sysId = args.sys_id

    if (!sysId) {
        return null
    }

    // --- New: sn_lxp.LearningAPI implementation ---
    const learningAPI = new sn_lxp.LearningAPI()
    const encodedQuery = 'sys_id=' + sysId
    const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS, 1)

    if (results && results.length > 0) {
        const rec = results[0]
        return {
            sys_id: rec.sys_id || '',
            user: rec.user || '',
            dv_user: rec.__dv_user || '',
            content: rec.content || '',
            dv_content: rec.__dv_content || '',
            status: rec.status || '',
            dv_status: rec.__dv_status || '',
            percentage: parseInt(rec.percentage || '0', 10),
            started_at: rec.started_at || '',
            completed_at: rec.completed_at || '',
            last_accessed: rec.last_accessed || '',
            sys_created_on: rec.sys_created_on || '',
            sys_updated_on: rec.sys_updated_on || '',
            number: rec.number || '',
            percent_complete: rec.percent_complete || '',
        }
    }

    return null

    // --- Old: GlideRecord implementation ---
    // const gr = new GlideRecord('sn_lxp_progress')
    // if (gr.get(sysId)) {
    //     return {
    //         sys_id: gr.getUniqueValue(),
    //         user: gr.getDisplayValue('user') || '',
    //         content: gr.getValue('content') || '',
    //         status: gr.getValue('status') || '',
    //         percentage: parseInt(gr.getValue('percentage') || '0', 10),
    //         started_at: gr.getValue('started_at') || '',
    //         completed_at: gr.getValue('completed_at') || '',
    //         last_accessed: gr.getValue('last_accessed') || '',
    //         sys_created_on: gr.getValue('sys_created_on') || '',
    //         sys_updated_on: gr.getValue('sys_updated_on') || '',
    //         number: gr.getValue('number') || '',
    //         percent_complete: gr.getValue('percent_complete') || '',
    //     }
    // }
    //
    // return null
}

export function resolveProgressContent(env: any) {
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
