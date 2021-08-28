<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Developers Controller
 *
 * @property \App\Model\Table\DevelopersTable $Developers
 * @method \App\Model\Entity\Developer[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class DevelopersController extends AppController
{

    /**
     * Paginate options.
     */
    public $paginate = [
        'limit' => 10,
        'sortableFields' => [
            'id',
            'nome',
            'sexo',
            'hobby',
            'datanascimento'
        ]
    ];

    /**
     * Initialization hook method.
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        $this->loadComponent('Search.Search', [
            'actions' => ['index'],
        ]);
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void.
     */
    public function index()
    {
        $query = $this->Developers
            ->find('search', [
                'search' => $this->getRequest()->getQueryParams()
            ]
        );
        $count = $query->count();
        $pagination = [
            'count' => $count,
            'pages' => ceil($count / $this->paginate['limit']),
            'current' => $this->getRequest()->getQuery('page', 0),
        ];
        $this->set('pagination', $pagination);
        $this->set('data', $this->paginate($query, $this->paginate));
        $this->viewBuilder()->setOption('serialize', ['pagination','data']);
    }

    /**
     * View method
     *
     * @param string|null $id Developer id.
     * @return \Cake\Http\Response|null|void
     */
    public function view($id = null)
    {
        $data = [];
        try {
            $data = $this->Developers->get($id);
        } catch(\Exception $exception) {
            $this->setResponse($this->getResponse()->withStatus(404));
        }
        $this->set('data', $data);
        $this->viewBuilder()->setOption('serialize', ['data']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void.
     */
    public function add()
    {
        try {
            $this->request->allowMethod(['post', 'put']);
            $developer = $this->Developers->newEntity($this->request->getData());
            $this->Developers->saveOrFail($developer);
            $this->setResponse($this->getResponse()->withStatus(201));
            $this->set('data', $developer);
            $this->viewBuilder()->setOption('serialize', ['data']);
        } catch(\Exception $exception) {
            $this->setResponse($this->getResponse()->withStatus(400));
            $this->set('errors', $developer->getErrors());
            $this->viewBuilder()->setOption('serialize', ['errors']);
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Developer id.
     * @return \Cake\Http\Response|null|void.
     */
    public function edit($id = null)
    {
        try {
            $this->request->allowMethod(['put']);
            $developer = $this->Developers->get($id);
            $developer = $this->Developers->patchEntity($developer, $this->request->getData());
            $this->Developers->saveOrFail($developer);
            $this->set('data', $developer);
            $this->viewBuilder()->setOption('serialize', ['data']);
        } catch(\Exception $exception) {
            $this->setResponse($this->getResponse()->withStatus(400));
            $this->set('errors',  $developer->getErrors());
            $this->viewBuilder()->setOption('serialize', ['errors']);
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Developer id.
     * @return \Cake\Http\Response|null|void.
     */
    public function delete($id = null)
    {
        try {
            $this->request->allowMethod(['delete']);
            $developer = $this->Developers->get($id);
            $this->Developers->deleteOrFail($developer);
            $this->setResponse($this->getResponse()->withStatus(204));
            $this->viewBuilder()->setOption('serialize', []);
        } catch(\Exception $e) {
            $this->setResponse($this->getResponse()->withStatus(400));
            $this->set('errors', []);
            $this->viewBuilder()->setOption('serialize', ['errors']);
        }
    }
}
