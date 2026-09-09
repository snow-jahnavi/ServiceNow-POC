/**
 * Type declarations for the ServiceNow Learning Experience Platform (sn_lxp) scoped API.
 * These APIs are available at runtime on the ServiceNow server but do not ship
 * with TypeScript definitions in @servicenow/glide.
 */
declare namespace sn_lxp {
    class LearningAPI {
        constructor();

        /**
         * Queries a table with security constraints and returns an array of
         * GlideRecord-like objects whose fields can be read via getValue().
         *
         * @param tableName    - The table to query (e.g. 'sn_lxp_content_base')
         * @param encodedQuery - An encoded query string
         * @param fields       - Comma-separated field names to return
         * @param limit        - Maximum number of records to return
         * @returns Array of record objects exposing getValue()
         */
        getGlideRecordSecureSetData(
            tableName: string,
            encodedQuery: string,
            fields: string,
            limit: number
        ): Array<{ getValue(field: string): string }>;
    }
}
