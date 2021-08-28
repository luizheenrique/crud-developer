<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\Chronos\Date as ChronosDate;
use Cake\I18n\FrozenDate;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Developers Model
 *
 * @method \App\Model\Entity\Developer newEmptyEntity()
 * @method \App\Model\Entity\Developer newEntity(array $data, array $options = [])
 * @method \App\Model\Entity\Developer[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Developer get($primaryKey, $options = [])
 * @method \App\Model\Entity\Developer findOrCreate($search, ?callable $callback = null, $options = [])
 * @method \App\Model\Entity\Developer patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Developer[] patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Developer|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Developer saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Developer[]|\Cake\Datasource\ResultSetInterface|false saveMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Developer[]|\Cake\Datasource\ResultSetInterface saveManyOrFail(iterable $entities, $options = [])
 * @method \App\Model\Entity\Developer[]|\Cake\Datasource\ResultSetInterface|false deleteMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Developer[]|\Cake\Datasource\ResultSetInterface deleteManyOrFail(iterable $entities, $options = [])
 */
class DevelopersTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('developers');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');
        $this->addBehavior('Timestamp');
        $this->addBehavior('Search.Search');

        $this->searchManager()
            ->value('id')
            ->like('nome', [
                'before' => '%',
                'after' => '%'
            ])
            ->value('sexo')
            ->like('hobby', [
                'before' => '%',
                'after' => '%'
            ])
            ->value('datanascimento');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->integer('id')
            ->allowEmptyString('id', null, 'create');

        $validator
            ->scalar('nome')
            ->maxLength('nome', 255)
            ->requirePresence('nome', 'create')
            ->notEmptyString('nome');

        $validator
            ->scalar('sexo')
            ->maxLength('sexo', 2)
            ->inList('sexo', ['M', 'F'])
            ->requirePresence('sexo', 'create')
            ->notEmptyString('sexo');

        $validator
            ->scalar('hobby')
            ->maxLength('hobby', 255)
            ->allowEmptyString('hobby');

        $validator
            ->date('datanascimento')
            ->requirePresence('datanascimento', 'create')
            ->notEmptyDate('datanascimento');

        return $validator;
    }
}
