import { GlideRecord, gs } from '@servicenow/glide'

const LOG_PREFIX = '[LXP GraphQL] '
const COURSE_FIELDS = 'sys_id,name,short_description,description,state,active'

export function resolveUpdateCourseDescription(env: any) {
    try {
        const args = env.getArguments()
        const sysId = args.sys_id
        const description = args.description

        if (!sysId || description === undefined) {
            return {
                success: false,
                message: 'sys_id and description are required',
                course: null,
            }
        }

        // --- New: Using GlideRecord for update (write operation) + sn_lxp.LearningAPI for read-back ---
        const gr = new GlideRecord('sn_lxp_content_base')
        if (gr.get(sysId)) {
            gr.setValue('description', description)
            gr.update()

            // Use LearningAPI to read back the updated record securely
            const learningAPI = new sn_lxp.LearningAPI()
            const encodedQuery = 'sys_id=' + sysId
            const results = learningAPI.getGlideRecordSecureSetData('sn_lxp_content_base', encodedQuery, COURSE_FIELDS, 1)

            if (results && results.length > 0) {
                const rec = results[0]
                return {
                    success: true,
                    message: 'Course description updated successfully',
                    course: {
                        sys_id: rec.getValue('sys_id') || '',
                        name: rec.getValue('name') || '',
                        short_description: rec.getValue('short_description') || '',
                        description: rec.getValue('description') || '',
                        state: rec.getValue('state') || '',
                        active: rec.getValue('active') === 'true',
                    },
                }
            }

            // Fallback if LearningAPI read-back fails
            return {
                success: true,
                message: 'Course description updated successfully',
                course: null,
            }
        }

        return {
            success: false,
            message: 'Course not found with the provided sys_id',
            course: null,
        }

        // --- Old: GlideRecord-only implementation ---
        // const gr = new GlideRecord('sn_lxp_content_base')
        // if (gr.get(sysId)) {
        //     gr.setValue('description', description)
        //     gr.update()
        //
        //     return {
        //         success: true,
        //         message: 'Course description updated successfully',
        //         course: {
        //             sys_id: gr.getUniqueValue(),
        //             name: gr.getValue('name') || '',
        //             short_description: gr.getValue('short_description') || '',
        //             description: gr.getValue('description') || '',
        //             state: gr.getValue('state') || '',
        //             active: gr.getValue('active') === 'true',
        //         },
        //     }
        // }
        //
        // return {
        //     success: false,
        //     message: 'Course not found with the provided sys_id',
        //     course: null,
        // }
    } catch (e: any) {
        gs.error(LOG_PREFIX + 'resolveUpdateCourseDescription: ' + e.message)
        throw e
    }
}
