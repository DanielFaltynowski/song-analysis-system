mkdir neo4j;
cd neo4j;
mkdir logs;
mkdir data;
mkdir plugins;
cd ..;
docker run \
    --name $1 \
    -p7474:7474 -p7687:7687 \
    -d \
    -v "$(pwd)"/neo4j/data:/data \
    -v "$(pwd)"/neo4j/logs:/logs \
    -v "$(pwd)"/neo4j/import:/var/lib/neo4j/import \
    -v "$(pwd)"/neo4j/plugins:/plugins \
    -e NEO4J_apoc_export_file_enabled=true \
    -e NEO4J_apoc_import_file_enabled=true \
    -e NEO4J_apoc_import_file_use__neo4j__config=true \
    -e NEO4J_PLUGINS=\[\"apoc\"\] \
    --env=NEO4J_AUTH=none \
    neo4j:latest;