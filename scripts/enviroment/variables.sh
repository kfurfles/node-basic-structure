sample=$(az pipelines variable-group list --group-name $1 --project CONECTA)
echo $(node ./scripts/enviroment/printer.js -p "$sample" .env)