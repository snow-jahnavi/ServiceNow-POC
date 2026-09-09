(function process( /*ResolverEnvironment*/ env) {
    try {
        var PROGRESS_FIELDS = 'sys_id,user,content,status,percentage,started_at,completed_at,last_accessed,sys_created_on,sys_updated_on,number,percent_complete,state,enrollment_date,completion_date';

        var args = env.getArguments();
        var limit = args.limit || 20;
        var userId = args.user_id;
        var contentId = args.content_id;
        var status = args.status;

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, limit);

        var queryParts = [];
        if (userId) {
            queryParts.push('user=' + userId);
        }
        if (contentId) {
            queryParts.push('content=' + contentId);
        }
        if (status) {
            queryParts.push('status=' + status);
        }
        var encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on';

        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_progress', encodedQuery, PROGRESS_FIELDS);

        var records = [];
        for (var i = 0; i < results.items.length; i++) {
            var rec = results.items[i];
            records.push({
                sys_id: rec.sys_id || '',
                user: rec.user || '',
                content: rec.content || '',
                status: rec.status || '',
                percentage: parseInt(rec.percentage || '0', 10),
                started_at: rec.started_at || '',
                completed_at: rec.completed_at || '',
                last_accessed: rec.last_accessed || '',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
                number: rec.number || '',
                percent_complete: rec.percent_complete || '',
                state: rec.state || '',
                enrollment_date: rec.enrollment_date || '',
                completion_date: rec.completion_date || '',
            });
        }

        return records;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveProgressRecords: ' + e.message);
        throw e;
    }
})(env);
