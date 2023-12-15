bash songs_recommendation/neo4j/create-neo4j-db.sh song-analysis-system;
cp ./songs_recommendation/neo4j/data.csv ./neo4j/import;

echo "Wait 30 seconds to run database! . . .";
sleep 30;
python songs_recommendation/neo4j/creator.py;

echo "Wait 30 seconds to run server! . . ."
sleep 30;
flask --app songs_recommendation/server/app.py run;