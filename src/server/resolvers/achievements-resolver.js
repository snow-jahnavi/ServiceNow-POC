(function process( /*ResolverEnvironment*/ env) {
    try {
        var LOG_PREFIX = '[LXP GraphQL] ';
        var ACHIEVEMENT_FIELDS = 'sys_id,name,description,user,achievement_type,badge,points,earned_on,active,sys_created_on,sys_updated_on';

        var args = env.getArguments();
        var limit = args.limit || 20;
        var userId = args.user_id;
        var achievementType = args.achievement_type;
        var active = args.active;

        var learningAPI = new sn_lxp.LearningAPI({ queryParams: {}}, {}, limit);

        var queryParts = [];
        if (userId) {
            queryParts.push('user=' + userId);
        }
        if (achievementType) {
            queryParts.push('achievement_type=' + achievementType);
        }
        if (active !== undefined && active !== null) {
            queryParts.push('active=' + active);
        }
        var encodedQuery = queryParts.length > 0 ? queryParts.join('^') + '^ORDERBYDESCsys_created_on' : 'ORDERBYDESCsys_created_on';

        var results = learningAPI.getGlideRecordSecureSetData('sn_lxp_achievement', encodedQuery, ACHIEVEMENT_FIELDS);

        var records = [];
        for (var i = 0; i < results.items.length; i++) {
            var rec = results.items[i];
            records.push({
                sys_id: rec.sys_id || '',
                name: rec.name || '',
                description: rec.description || '',
                user: rec.user || '',
                achievement_type: rec.achievement_type || '',
                badge: rec.badge || '',
                points: parseInt(rec.points || '0', 10),
                earned_on: rec.earned_on || '',
                active: rec.active === 'true',
                sys_created_on: rec.sys_created_on || '',
                sys_updated_on: rec.sys_updated_on || '',
            });
        }

        return records;
    } catch (e) {
        gs.error('[LXP GraphQL] resolveAchievements: ' + e.message);
        throw e;
    }
})(env);
